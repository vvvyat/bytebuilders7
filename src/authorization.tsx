import { Button, ConfigProvider, Form, Input } from "antd";
import React, { useState } from "react";
import { useAuthorizationMutation } from "./fetch/authorize";

export const Authorization: React.FC = React.memo(() => {
  const [form] = Form.useForm();

  const [isFailed, setIsFailed] = useState(false);

  const { mutateAsync: authorize, error } = useAuthorizationMutation(setIsFailed);

  /*useEffect(() => {
    sessionStorage.clear();
  }, []);*/

  const ValidateForm = async () => {
    try {
      await form.validateFields();
      authorize({
        email: form.getFieldValue("email"),
        password: form.getFieldValue("password"),
      });
    } catch (err) {
      if (typeof err === "object" && err !== null && "errorFields" in err) {
        const errorFields = err.errorFields as Array<{
          name: string[];
          errors: string[];
        }>;
        const firstErrorField = errorFields[0].name;
        form.scrollToField(firstErrorField, {
          behavior: "smooth",
          block: "center",
          focus: true,
        });
      }
    }
  };

  return (
    <>
      <div
        className="modal"
        style={{
          width: "50vw",
          height: "fit-content",
          margin: "15vh auto",
          padding: "5vh 0",
        }}
      >
        <h1>Вход</h1>
        <ConfigProvider
          theme={{
            token: {
              fontSize: 18,
              fontFamily:
                "Gelasio, system-ui, Avenir, Helvetica, Arial, sans-serif",
              colorError: "#ef0004ff",
            },
            components: {
              Input: {
                colorBgContainer: "#7BC47B",
                colorBorder: "#83480D",
                hoverBorderColor: "#83480D",
                activeBorderColor: "#83480D",
                lineWidth: 3,
                colorErrorBorderHover: "#ef0004ff",
              },
            },
          }}
        >
          <Form
            form={form}
            style={{
              width: "60%",
              margin: "50px auto",
              fontWeight: 700,
              display: "flex",
              flexDirection: "column",
              gap: "3vh",
            }}
            autoComplete="off"
            className="authorization-form"
          >
            <Form.Item
              label="E-mail:"
              name="email"
              rules={[
                { required: true, message: "Обязательное поле!" },
                {
                  type: "email",
                  message:
                    "Введите корректный адрес электронной почты (например, mail@example.ru).",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[{ required: true, message: "Обязательное поле!" }]}
            >
              <Input.Password size="large" />
            </Form.Item>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                className="primary-button"
                type="primary"
                onClick={() => ValidateForm()}
                style={{
                  backgroundColor: "#83480D",
                  borderRadius: 15,
                  color: "#FFFFFF",
                  fontSize: 24,
                  fontWeight: 700,
                  padding: "30px 50px",
                  width: "fit-content",
                }}
              >
                Войти
              </Button>
              {isFailed && <p>{error?.message}</p>}
            </div>
          </Form>
        </ConfigProvider>
      </div>
    </>
  );
});
