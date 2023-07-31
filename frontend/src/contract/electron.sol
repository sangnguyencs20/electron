// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Electron {
    enum DraftStatus { Draft, Submitted, Approved, Rejected, Published, Finished }
    enum ApproverStatus{ Pending, Approved, Rejected}

    struct Comment {
        bytes32 content_hashed;
        uint256 commentDay;
        address commentOwner;
    }
    struct Level1Status {
        ApproverStatus decide;
        bytes32 comment_hashed;
        bool grant;
    }

    struct Level2Status {
        ApproverStatus decide;
        bytes32 comment_hashed;
    }

    struct Level1ApproverList {
        address[] level1Approvers;
        uint256 total;
        mapping(address => Level1Status) level1ApproversStatus;
    }

    struct Level2ApproverList {
        uint256 total;
        address[] level2Approvers;
        mapping(address => Level2Status) level2ApproversStatus;
    }

    struct Draft {
        bytes20 id;
        bytes32 content_hashed;
        address owner;
        uint256 deadlineApprove;
        DraftStatus status;
        Level1ApproverList level1List;
        Level2ApproverList level2List;
        mapping(address=>Comment[]) commentHistory;
    }
    //properties
    mapping (bytes20 => Draft) drafts;
    //event
    event DraftCreated(bytes20 indexed id, address indexed owner, bytes32 content_hashed, uint256 indexed atTime, address[] level1Approvers);
    event DraftSubmitted(bytes20 indexed id, address indexed owner,uint256 atTime);
    event Level2ApproversAssigned(bytes20 indexed id, address[] level2Approvers, uint256 atTime);
    event Level1ApproverDecision(bytes20 indexed id, address approver, bool decision, bytes32 commentHashed, uint256 atTime);
    event Level2ApproverDecision(bytes20 indexed id, address approver, bool decision, bytes32 commentHashed, uint256 atTime);
    event DraftApproved(bytes20 indexed id, uint256 atTime);
    event DraftRejected(bytes20 indexed id, uint256 atTime);
    event DraftPublished(bytes20 indexed id, uint256 atTime);
    event CommentLeft(bytes20 indexed id , address indexed commenter, bytes32 contentHashed, uint256 atTime);
    event DraftFinished(bytes20 indexed id, uint256 atTime);
    //
    function createDraft(
        bytes20 _id,
        bytes32  _contentHashed,
        address[] memory _level1Approvers
    ) public draftNonExists(_id){
        require(_level1Approvers.length > 0,"The minium Length of Level 1 Approvers must be 1");
        Draft storage newDraft = drafts[_id];

        newDraft.id = _id;
        newDraft.owner = msg.sender;
        newDraft.content_hashed = _contentHashed;
        newDraft.status = DraftStatus.Draft;

        // Initialize Level 1 approver list
        newDraft.level1List.level1Approvers = _level1Approvers;
        newDraft.level1List.total = _level1Approvers.length;
        for (uint256 i = 0; i < _level1Approvers.length; i++) {
            newDraft.level1List.level1ApproversStatus[_level1Approvers[i]].grant = true;
        }
        // You can emit an event here to indicate the addition of a new draft
        emit DraftCreated(_id, msg.sender, _contentHashed, block.timestamp, _level1Approvers);
    }
    function submitDraft(bytes20 _id, uint256 _deadlineApprove) public draftExists(_id) checkDraftStatus(_id,DraftStatus.Draft){
        require(_deadlineApprove > block.timestamp, "deadlineDay not fit");
        Draft storage draft = drafts[_id];
        draft.deadlineApprove = _deadlineApprove;
        draft.status = DraftStatus.Submitted;

        emit DraftSubmitted(_id, msg.sender, block.timestamp);
    }

    function decideDraft(bytes20 _id, bool decide, bytes32 comment_hashed) public draftExists(_id)  withinDeadline(_id){
        Draft storage draft = drafts[_id];

        if(isInArray(msg.sender, draft.level1List.level1Approvers))
            decideLevel1Approver(_id, decide, comment_hashed);
        if(isInArray(msg.sender, draft.level2List.level2Approvers))
            decideLevel2Approver(_id, decide, comment_hashed);
    }

    function decideLevel1Approver(bytes20 _id, bool decide, bytes32 comment_hashed) private {
        Draft storage draft = drafts[_id];

        draft.level1List.level1ApproversStatus[msg.sender].decide = convertDecide(decide);
        draft.level1List.level1ApproversStatus[msg.sender].comment_hashed = comment_hashed;

        emit Level1ApproverDecision(_id, msg.sender, decide, comment_hashed, block.timestamp);
    }

    function decideLevel2Approver(bytes20 _id, bool decide, bytes32 comment_hashed) private {
        Draft storage draft = drafts[_id];

        draft.level2List.level2ApproversStatus[msg.sender].decide = convertDecide(decide);
        draft.level2List.level2ApproversStatus[msg.sender].comment_hashed = comment_hashed;

        emit Level2ApproverDecision(_id, msg.sender, decide, comment_hashed, block.timestamp);
    }

   function assignLevel2Approver(bytes20 _id, address[] memory level2Approvers) public draftExists(_id) isLevel1Approver(_id) isGrant(_id){
        Draft storage draft = drafts[_id];

        // Loop through each Level 2 approver address in the array
        for (uint256 i = 0; i < level2Approvers.length; i++) {
            address newApprover = level2Approvers[i];

            // Add the new approver to Level 2 approver list
            draft.level2List.level2Approvers.push(newApprover);
            draft.level2List.total++;
        }
        draft.level1List.level1ApproversStatus[msg.sender].grant = false;

        emit Level2ApproversAssigned(_id, level2Approvers, block.timestamp);
    }

    function checkApprove(bytes20 _id) public draftExists(_id) pastDeadline(_id) returns (bool)  {
        Draft storage draft = drafts[_id];
        //check level1
         for (uint256 i = 0; i < draft.level1List.level1Approvers.length; i++) {
            address level1Approver = draft.level1List.level1Approvers[i];
            if(draft.level1List.level1ApproversStatus[level1Approver].grant){
                draft.status = DraftStatus.Rejected;

                emit DraftRejected(_id, block.timestamp);
                return false;
            }
        }
        //check level2
        bool isApprove = true;
        for (uint256 i = 0; i < draft.level2List.level2Approvers.length; i++) {
            address approverAddress = draft.level2List.level2Approvers[i];
            Level2Status memory status = draft.level2List.level2ApproversStatus[approverAddress];
            if(status.decide==ApproverStatus.Pending){
                isApprove = false;
                break;
            }
            else if (status.decide == ApproverStatus.Rejected){
                isApprove = false;
                break;
            }

        }

        if(isApprove){
            draft.status = DraftStatus.Approved;

            emit DraftApproved((_id), block.timestamp);
            return true;
        }
        else{
            draft.status = DraftStatus.Rejected;

            emit DraftRejected(_id, block.timestamp);
            return false;
        }
    }

        function checkEarlyApprove(bytes20 _id) public draftExists(_id) onlyOwner(_id) returns (bool)  {
        Draft storage draft = drafts[_id];
        //check level1
         for (uint256 i = 0; i < draft.level1List.level1Approvers.length; i++) {
            address level1Approver = draft.level1List.level1Approvers[i];
            if(draft.level1List.level1ApproversStatus[level1Approver].grant){
                draft.status = DraftStatus.Rejected;

                // emit DraftRejected(_id, block.timestamp);
                return false;
            }
        }
        //check level2
        bool isApprove = true;
        for (uint256 i = 0; i < draft.level2List.level2Approvers.length; i++) {
            address approverAddress = draft.level2List.level2Approvers[i];
            Level2Status memory status = draft.level2List.level2ApproversStatus[approverAddress];
            if(status.decide==ApproverStatus.Pending){
                isApprove = false;
                return false;
                // break;
            }
            else if (status.decide == ApproverStatus.Rejected){
                isApprove = false;
                break;
            }

        }

        if(isApprove){
            draft.status = DraftStatus.Approved;

            emit DraftApproved((_id), block.timestamp);
            return true;
        }
        else{
            draft.status = DraftStatus.Rejected;

            emit DraftRejected(_id, block.timestamp);
            return false;
        }
    }

     function publish(bytes20 _id) public checkDraftStatus(_id,DraftStatus.Approved) onlyOwner(_id){
        Draft storage draft = drafts[_id];
        draft.status = DraftStatus.Published;

        emit DraftPublished(_id, block.timestamp);
    }

    function comment(bytes20 _id, bytes32 _contentHashed) public checkDraftStatus(_id,DraftStatus.Published){
        Draft storage draft = drafts[_id];
        Comment[] storage comments = draft.commentHistory[msg.sender];
        comments.push(Comment(_contentHashed,block.timestamp, msg.sender));

        emit CommentLeft(_id, msg.sender, _contentHashed, block.timestamp);
}
    function finish(bytes20 id) public onlyOwner(id){
        Draft storage draft = drafts[id];
        require(draft.status == DraftStatus.Approved || draft.status == DraftStatus.Published, "Can not finish draft");
        draft.status = DraftStatus.Finished;

        emit DraftFinished(id, block.timestamp);
    }
    //view funcitions
    function getDraft(bytes20 _id) public view draftExists(_id) returns (
        bytes20 id,
        address owner,
        uint256 deadline,
        bytes32 content_hashed,
        DraftStatus status,
        uint256 totalLevel1Approvers,
        address[] memory level1Approvers,
        uint256 totalLevel2Approvers,
        address[] memory level2Approvers

    ) {
        Draft storage draft = drafts[_id];
        return (
            draft.id,
            draft.owner,
            draft.deadlineApprove,
            draft.content_hashed,
            draft.status,
            draft.level1List.total,
            draft.level1List.level1Approvers,
            draft.level2List.total,
            draft.level2List.level2Approvers
        );
    }

    // View function to get Level 1 approver status
    function getLevel1ApproverStatus(bytes20 _id, address approver) public view draftExists(_id) returns (
        ApproverStatus decision,
        bytes32 comment_hashed,
        bool grant
    ) {
        Draft storage draft = drafts[_id];
        Level1Status storage status = draft.level1List.level1ApproversStatus[approver];
        return (
            status.decide,
            status.comment_hashed,
            status.grant
        );
    }

    // View function to get Level 2 approver status
    function getLevel2ApproverStatus(bytes20 _id, address approver) public view draftExists(_id) returns (
        ApproverStatus decision,
        bytes32 comment_hashed
    ) {
        Draft storage draft = drafts[_id];
        Level2Status storage status = draft.level2List.level2ApproversStatus[approver];
        return (
            status.decide,
            status.comment_hashed
        );
    }

    // View function to get comments for a draft from a specific commenter
    function getComments(bytes20 _id, address commenter) public view draftExists(_id) returns (Comment[] memory) {
        Draft storage draft = drafts[_id];
        return draft.commentHistory[commenter];
    }

    //utils
    function isInArray(address addr,address[] memory myArray) private pure returns (bool) {
        for (uint256 i = 0; i < myArray.length; i++) {
            if (myArray[i] == addr) {
                return true;
            }
        }
        return false;
    }
     function convertDecide(bool flag) private pure returns (ApproverStatus) {
        return flag ? ApproverStatus.Approved : ApproverStatus.Rejected;
    }
    //modifier
     modifier isLevel1Approver(bytes20 id) {
        Draft storage draft = drafts[id];
        require(isInArray(msg.sender, draft.level1List.level1Approvers), "You must be a Level 1 approver");
        _;
    }
    modifier isGrant(bytes20 _id) {
        Draft storage draft = drafts[_id];
        Level1Status storage level1Status = draft.level1List.level1ApproversStatus[msg.sender];
        require(level1Status.grant && level1Status.decide == ApproverStatus.Approved, "You have asigned or You haven't approved");
        _;
    }
     // Modifier kiểm tra xem người dùng có phải là Level 2 approver hay không
    modifier isLevel2Approver(bytes20 _id) {
        Draft storage draft = drafts[_id];
        require(isInArray(msg.sender, draft.level2List.level2Approvers), "You must be a Level 2 approver");
        _;
    }

    modifier draftNonExists(bytes20 _id) {
        require(drafts[_id].id == 0, "Draft with this ID does exist");
        _;
    }

    modifier draftExists(bytes20 _id) {
        require(drafts[_id].id == _id, "Draft with this ID does not exist");
        _;
    }
    modifier isApprover(bytes20 _id) {
        Draft storage draft = drafts[_id];
        require(
        isInArray(msg.sender, draft.level1List.level1Approvers) ||
        isInArray(msg.sender, draft.level2List.level2Approvers),
        string(abi.encodePacked("You must be an approver. Sender: ", (msg.sender)))
    );
    _; // Continue with the function if the caller is a Level 1 or Level 2 approver
    }
    modifier checkDraftStatus(bytes20 _id,DraftStatus desiredStatus) {
        require(drafts[_id].status == desiredStatus, "Draft must be in a wrong status");
        _; // Tiếp tục thực hiện hành động nếu kiểm tra thành công
    }

    modifier allLevel1ApproversAssigned(bytes20 _id) {
        Draft storage draft = drafts[_id];
        for (uint256 i = 0; i < draft.level1List.level1Approvers.length; i++) {
            address level1Approver = draft.level1List.level1Approvers[i];
            require(!draft.level1List.level1ApproversStatus[level1Approver].grant, "All Level 1 approvers must assign Level 2 approvers");
        }
        _;
    }
        modifier onlyOwner(bytes20 _id) {
        require(drafts[_id].owner == msg.sender, "Only the owner can perform this action");
        _; // Tiếp tục thực hiện hành động nếu kiểm tra thành công
    }
    modifier withinDeadline(bytes20 _id) {
    Draft storage draft = drafts[_id];
    require(draft.deadlineApprove > block.timestamp, "Draft is already past the deadline");
    _; // Continue with the function if the draft is within the deadline
    }

modifier pastDeadline(bytes20 _id) {
    Draft storage draft = drafts[_id];
    require(draft.deadlineApprove <= block.timestamp, "Draft is still within the deadline");
    _; // Continue with the function if the draft is past the deadline
    }
}
