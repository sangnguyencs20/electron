import { Card, Text, Button, Row, Collapse } from "@nextui-org/react";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
export default function App() {
  return (
    <Card isHoverable css={{ mw: "330px" }}>
      <Card.Header className="flex justify-between">
        <Text b>Draft Title</Text>
        <DraftsOutlinedIcon className="text-blue-600" />
      </Card.Header>
      <Card.Body css={{ py: "$10" }}>
        <Collapse.Group>
          <Collapse
            title="Information"
            subtitle="More description about information"
          >
            <Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Text>
            <p className="text-slate-400 text-xs">Description</p>
            <div className="mt-10 flex justify-between pr-10">
              <div>
                <p className="font-bold text-sm text-slate-700">createdBy</p>
                <p className="text-slate-400 text-xs">Created By</p>
              </div>
              <div className="col-span-1">
                <p className="font-bold text-sm text-slate-700">time</p>
                <p className="text-slate-400 text-xs">To Date</p>
              </div>
            </div>
          </Collapse>
        </Collapse.Group>
      </Card.Body>
      <Card.Footer className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
        <Row justify="flex-end">
          <Button size="sm" light className="text-white hover:text-slate-200">
            Detail
          </Button>
          <Button
            size="sm"
            light
            className="text-slate-50 hover:text-slate-200"
          >
            Mark
          </Button>
        </Row>
      </Card.Footer>
    </Card>
  );
}
