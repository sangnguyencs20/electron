import {
  Button,
  Grid,
  Input,
  Popover,
  Row,
  Text,
  useInput,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import { axiosCheckPassword } from "../api";
import { useState } from "react";
import { useSelector } from "react-redux";
import { decryptPrivateKey } from "../utils";

const LoginModal = ({
  children,
  scFunction,
  scData,
  axiosFunction,
  axiosData,
  closeHandler = () => {},
  setIsLoading = () => {},
  setNeedRefresh = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hashedPrivateKey = useSelector(
    (state) => state.userState.hashedPrivateKey
  );
  const {
    value: password,
    setValue: setPrivateKey,
    reset: descPrivateKey,
    bindings: passwordBindings,
  } = useInput("");

  const handleSubmit = async () => {
    closeHandler();
    const myPromise = new Promise((resolve, reject) => {
      axiosCheckPassword({ password })
        .then((res) => {
          // console.log();
          toast.success(res.data.message);
          scFunction(decryptPrivateKey(hashedPrivateKey, password), scData)
            .then((hash) => {
              setIsLoading(true);
              console.log(hash);
              axiosFunction({ ...axiosData, txHash: hash })
                .then((res) => {
                  setIsLoading(false);
                  console.log(res);
                  setNeedRefresh((pre) => pre + 1);
                  resolve(hash);
                })
                .catch((err) => {
                  console.log(err);
                  reject(err);
                });
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err.message);
        });
    });

    toast.promise(
      myPromise,
      {
        pending: "Draft is being processed",
        success: {
          render({ data }) {
            return `Process draft successfully:  ${data}`;
          },
        },
        error: {
          render({ data }) {
            return `Process draft fail:  ${data}`;
          },
        },
      },
      { position: toast.POSITION.BOTTOM_RIGHT }
    );
  };
  return (
    <Popover
      shouldCloseOnBlur={true}
      triggerType="grid"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    >
      <Popover.Trigger>{children}</Popover.Trigger>
      <Popover.Content>
        <Grid.Container
          css={{
            borderRadius: "14px",
            paddingBlock: "2rem",
            maxWidth: "330px",
            gap: "20px",
          }}
        >
          <Row justify="center" align="center">
            <Text b>Xác nhận</Text>
          </Row>
          <Row
            css={{
              paddingInline: "10%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Input
              type="password"
              {...passwordBindings}
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Password"
              // contentLeft={<Password fill="currentColor" />}
            />
          </Row>
          <Grid.Container justify="center" alignContent="center">
            <Button
              size="sm"
              flat
              color="default"
              css={{
                backgroundColor: "#CEE4FE !important",
                width: "80% !important",
                padding: "10px !important",
                height: "50px",
                borderRadius: "17px",
              }}
              onClick={(e) => {
                handleSubmit();
                setIsOpen(false);
              }}
            >
              Confirm
            </Button>
          </Grid.Container>
        </Grid.Container>
      </Popover.Content>
    </Popover>
  );
};

export default LoginModal;
