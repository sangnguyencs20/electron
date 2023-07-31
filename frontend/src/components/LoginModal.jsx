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

const LoginModal = ({
  children,
  scFunction,
  scData,
  axiosFunction,
  axiosData,
  closeHandler = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);

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
          toast.success(res.data.message);
          scFunction(scData)
            .then((hash) => {
              setIsLoading(true);
              console.log(hash);
              resolve(hash);
              axiosFunction({ ...axiosData, txHash: hash }).then((res) => {
                setIsLoading(false);
                console.log(res);
                resolve(hash);
                //   setNeedRefresh((pre) => pre + 1);
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
