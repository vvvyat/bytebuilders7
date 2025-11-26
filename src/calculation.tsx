import {
  Button,
  Carousel,
  Checkbox,
  ConfigProvider,
  Form,
  InputNumber,
  Table,
} from "antd";
import React, { useState } from "react";
import type { Factor } from "./consts";
import { CalculationResultColumns, FactorsResultColumns } from "./consts";
import { Header } from "./header";

export const Calculation: React.FC<{
  ecologicalFactors: Factor[];
  managementFactors: Factor[];
}> = React.memo(({ ecologicalFactors, managementFactors }) => {
  const [form] = Form.useForm();

  type FieldType = {
    Tday: number;
    GS: number;
    Tl: number;
    Tseason: number;

    Td: number;
    DT: number;

    TdList?: number[];
    DTList?: number[];

    ecologicalFactorsList: number[];
    managementFactorsList: number[];
  };

  const [Tday, setTdayValue] = useState<number | null>();
  const [GS, setGSValue] = useState<number | null>();
  const [Tl, setTlValue] = useState<number | null>(1);
  const [Tseason, setTseasonValue] = useState<number | null>();
  const [ecologicalFactorsList, setEcologicalFactorsList] = useState<number[]>(
    []
  );
  const [managementFactorsList, setManagementFactorsList] = useState<number[]>(
    []
  );

  const [Td, setTdValue] = useState<number | null>();
  const [DT, setDTValue] = useState<number | null>();

  const [isResultReady, setIsResultReady] = useState<boolean>(false);

  const [BCC, setBCCValue] = useState<number>();
  const [PCC, setPCCValue] = useState<number>();
  const [RCC, setRCCValue] = useState<number>();

  const ValidateForm = async () => {
    try {
      await form.validateFields();
      setEcologicalFactorsList(form.getFieldValue("ecologicalFactorsList"));
      setManagementFactorsList(form.getFieldValue("managementFactorsList"));

      setBCCValue(1);
      setPCCValue(2);
      setRCCValue(3);

      setIsResultReady(true);

      console.log(form.getFieldsValue());
    } catch (err) {
      console.error("Ошибка:", err);
    }
  };

  return (
    <>
      <Header />
      <main>
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            placeContent: "center",
          }}
        >
          <h1
            style={{
              position: "absolute",
              left: "50%",
              top: "10%",
              transform: "translate(-50%, 0%)",
            }}
          >
            Рекреационная ёмкость однодневных и многодневных маршрутов с
            фиксированным временем работы
          </h1>
          <img src="calc-bg-img.png" />
        </div>

        <Form
          form={form}
          initialValues={{
            Tl: 1,
            ecologicalFactorsList: [],
            managementFactorsList: [],
          }}
          labelAlign="left"
          labelWrap
          colon={false}
          labelCol={{ span: 17 }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15vh",
            fontWeight: 600,
          }}
        >
          <div style={{ margin: "0 12%" }}>
            <h2
              style={{
                backgroundColor: "#7BC47B",
                width: "60%",
                margin: 0,
                padding: "3vh 3%",
              }}
            >
              Исходные данные маршрута
            </h2>
            <div
              style={{
                width: "60%",
                fontWeight: 600,
                backgroundColor: "#E6FFD7",
                padding: "7vh 3%",
              }}
            >
              <ConfigProvider
                theme={{
                  token: {
                    fontSize: 18,
                    fontFamily:
                      "Gelasio, system-ui, Avenir, Helvetica, Arial, sans-serif",
                    colorError: "#ef0004ff",
                  },
                  components: {
                    InputNumber: {
                      colorBgContainer: "#7BC47B",
                      colorBorder: "#83480D",
                      hoverBorderColor: "#83480D",
                      activeBorderColor: "#83480D",
                      handleHoverColor: "#83480D",
                      lineWidth: 3,
                      colorErrorBorderHover: "#ef0004ff",
                    },
                  },
                }}
              >
                <Form.Item<FieldType>
                  name="Tday"
                  label="Время доступности  маршрута в сутки (в часах):"
                  rules={[
                    { required: true, message: "Обязательное поле!" },
                    {
                      type: "number",
                      min: Number.EPSILON,
                      max: 24,
                      message:
                        "Введите корректное значение (больше 0, но меньше 24 часов).",
                    },
                  ]}
                >
                  <InputNumber
                    className="input"
                    status={form.getFieldError("Tday").length ? "error" : ""}
                    decimalSeparator=","
                    value={Tday}
                    onChange={(value) => setTdayValue(value)}
                  />
                </Form.Item>

                <Form.Item<FieldType>
                  name="GS"
                  label="Среднее количество человек в группе (человек):"
                  rules={[
                    { required: true, message: "Обязательное поле!" },
                    {
                      type: "integer",
                      min: 1,
                      message:
                        "Введите корректное количество человек в группе.",
                    },
                  ]}
                >
                  <InputNumber
                    className="input"
                    status={form.getFieldError("GS").length ? "error" : ""}
                    value={GS}
                    onChange={(value) => setGSValue(value)}
                  />
                </Form.Item>

                <Form.Item<FieldType>
                  name="Tl"
                  label="Количество дней, необходимых для прохождения маршрута (в сутках):"
                  rules={[
                    { required: true, message: "Обязательное поле!" },
                    {
                      type: "integer",
                      min: 1,
                      message:
                        "Введите корректное количество дней (целое число больше 0).",
                    },
                  ]}
                >
                  <InputNumber
                    className="input"
                    status={form.getFieldError("Tl").length ? "error" : ""}
                    value={Tl}
                    onChange={(value) => setTlValue(value)}
                  />
                </Form.Item>

                <Form.Item<FieldType>
                  name="Tseason"
                  label="Количество дней туристического сезона (в сутках):"
                  rules={[
                    { required: true, message: "Обязательное поле!" },
                    {
                      type: "integer",
                      min: 1,
                      message:
                        "Введите количество дней в сезоне (целое число больше 0)",
                    },
                  ]}
                >
                  <InputNumber
                    className="input"
                    status={form.getFieldError("Tseason").length ? "error" : ""}
                    value={Tseason}
                    onChange={(value) => setTseasonValue(value)}
                  />
                </Form.Item>
              </ConfigProvider>
            </div>
          </div>

          <div>
            <h2 style={{ marginBottom: "7vh" }}>
              Параметры однодневных участков
            </h2>
            <Carousel
              arrows
              dots={false}
              draggable={true}
              slidesToShow={3}
              style={{ margin: "0 12%" }}
            >
              <div>
                <div
                  style={{
                    borderTop: "30px solid #83480D",
                    width: "20vw",
                    height: "fit-content",
                    maxHeight: "35vh",
                    backgroundColor: "#7BC47B",
                    padding: "14px 14px 20vh 14px",
                  }}
                >
                  <h3>День 1</h3>
                  <ConfigProvider
                    theme={{
                      token: {
                        fontSize: 16,
                        fontFamily:
                          "Gelasio, system-ui, Avenir, Helvetica, Arial, sans-serif",
                        colorError: "#ef0004ff",
                      },
                      components: {
                        InputNumber: {
                          colorBgContainer: "#EDF4D7",
                          colorBorder: "#83480D",
                          hoverBorderColor: "#83480D",
                          activeBorderColor: "#83480D",
                          handleHoverColor: "#83480D",
                          lineWidth: 3,
                          colorErrorBorderHover: "#ef0004ff",
                        },
                      },
                    }}
                  >
                    <Form.Item
                      className="day-info"
                      name="Td"
                      label="Среднее время прохождения участка:"
                      rules={[
                        { required: true, message: "Обязательное поле!" },
                        {
                          type: "number",
                          min: Number.EPSILON,
                          max: Tday ? Tday : Number.EPSILON,
                          message:
                            "Среднее время прохождения не может быть меньше 0 / превышать время доступности маршрута.",
                        },
                      ]}
                    >
                      <InputNumber
                        className="input"
                        status={form.getFieldError("Td").length ? "error" : ""}
                        decimalSeparator=","
                        value={Td}
                        onChange={(value) => setTdValue(value)}
                      />
                    </Form.Item>

                    <Form.Item
                      className="day-info"
                      name="DT"
                      label="Длина участка:"
                      rules={[
                        { required: true, message: "Обязательное поле!" },
                        {
                          type: "number",
                          min: Number.EPSILON,
                          message:
                            "Введите длину маршрута в километрах (значение должно быть больше 0)",
                        },
                      ]}
                    >
                      <InputNumber
                        className="input"
                        status={form.getFieldError("DT").length ? "error" : ""}
                        value={DT}
                        onChange={(value) => setDTValue(value)}
                      />
                    </Form.Item>
                  </ConfigProvider>
                </div>
              </div>
            </Carousel>
          </div>

          <div style={{ margin: "0 20%" }}>
            <h2 style={{ margin: 0, marginBottom: "5vh" }}>
              Выберите экологические факторы маршрута
            </h2>
            <div
              style={{
                backgroundColor: "#83480D",
                width: "60%",
                position: "absolute",
                zIndex: 10,
              }}
            >
              <div
                style={{
                  height: "8vh",
                  width: "3%",
                  borderRadius: "100%",
                  backgroundColor: "#D5B27A",
                  position: "relative",
                  left: "98.5%",
                }}
              ></div>
            </div>
            <ConfigProvider
              theme={{
                token: {
                  controlInteractiveSize: 20,
                  colorWhite: "#EDF4D7",
                  colorPrimaryHover: "#83480D",
                  colorPrimaryBorder: "#83480D",
                  colorPrimary: "#83480D",
                  colorBorder: "#83480D",
                  colorBgContainer: "#EDF4D7",
                  fontSize: 18,
                  fontFamily:
                    "Gelasio, system-ui, Avenir, Helvetica, Arial, sans-serif",
                },
              }}
            >
              <Form.Item<FieldType> name="ecologicalFactorsList">
                <Checkbox.Group
                  options={ecologicalFactors.map((factor) => ({
                    label: factor.factor,
                    value: factor.id,
                  }))}
                  className="checkbox-list"
                  style={{ backgroundColor: "#D5B27A", padding: "10vh 12%" }}
                />
              </Form.Item>
            </ConfigProvider>
          </div>

          <div style={{ backgroundColor: "#7BC47B", padding: "5vh 12%" }}>
            <h2 style={{ margin: 0, marginBottom: "8vh" }}>
              Выберите управленческие факторы маршрута
            </h2>
            <ConfigProvider
              theme={{
                token: {
                  controlInteractiveSize: 20,
                  colorWhite: "#EDF4D7",
                  colorPrimaryHover: "#83480D",
                  colorPrimaryBorder: "#83480D",
                  colorPrimary: "#83480D",
                  colorBorder: "#83480D",
                  colorBgContainer: "#EDF4D7",
                  fontSize: 18,
                  fontFamily:
                    "Gelasio, system-ui, Avenir, Helvetica, Arial, sans-serif",
                },
              }}
            >
              <Form.Item<FieldType> name="managementFactorsList">
                <Checkbox.Group
                  options={managementFactors.map((factor) => ({
                    label: factor.factor,
                    value: factor.id,
                  }))}
                  className="checkbox-list"
                />
              </Form.Item>
            </ConfigProvider>
          </div>

          <ConfigProvider
            theme={{
              token: {
                fontFamily:
                  "Gelasio, system-ui, Avenir, Helvetica, Arial, sans-serif",
              },
            }}
          >
            <Form.Item style={{ textAlign: "center" }}>
              <Button
                type="primary"
                onClick={ValidateForm}
                style={{
                  backgroundColor: "#83480D",
                  borderRadius: 15,
                  color: "#FFFFFF",
                  fontSize: 24,
                  fontWeight: 700,
                  padding: "30px 50px",
                }}
              >
                Рассчитать
              </Button>
            </Form.Item>
          </ConfigProvider>
        </Form>

        {isResultReady && (
          <div style={{ display: "flex", flexDirection: "column", gap: "7vh" }}>
            <h2 className="result-header">Результаты расчета</h2>
            <ConfigProvider
              theme={{
                token: {
                  fontFamily:
                    "Gelasio, system-ui, Avenir, Helvetica, Arial, sans-serif",
                },
                components: {
                  Table: {
                    borderColor: "#7BC47B",
                    colorBgContainer: "#E2F4D7",
                    lineWidth: 7,
                    cellFontSize: 18,
                    headerBorderRadius: 0,
                  },
                },
              }}
            >
              <Table
                dataSource={[
                  {
                    key: "1",
                    indicator: "Базовая рекреционная ёмкость",
                    mark: "BCC",
                    unit: "чел/сезон",
                    result: BCC,
                  },
                  {
                    key: "2",
                    indicator: "Потенциальная рекреционная ёмкость",
                    mark: "PCC",
                    unit: "чел/сезон",
                    result: PCC,
                  },
                  {
                    key: "3",
                    indicator: "Предельно допустимая рекреционная ёмкость",
                    mark: "RCC",
                    unit: "чел/сезон",
                    result: RCC,
                  },
                ]}
                columns={CalculationResultColumns}
                bordered
                rowHoverable={false}
                pagination={false}
              />

              {ecologicalFactorsList.length > 0 && (
                <div>
                  <h2 style={{ textAlign: "left", margin: "0 12%" }}>
                    Рекомандации (экологические факторы)
                  </h2>
                  <Table
                    dataSource={ecologicalFactors
                      .filter((factor) =>
                        ecologicalFactorsList.find((id) => id === factor.id)
                      )
                      .map((factor, i) =>
                        Object.assign(factor, { number: i + 1 })
                      )}
                    columns={FactorsResultColumns}
                    bordered
                    rowHoverable={false}
                    pagination={false}
                  />
                </div>
              )}

              {managementFactorsList.length > 0 && (
                <div>
                  <h2 style={{ textAlign: "left", margin: "0 12%" }}>
                    Рекомандации (управленческие факторы)
                  </h2>
                  <Table
                    dataSource={managementFactors
                      .filter((factor) =>
                        managementFactorsList.find((id) => id === factor.id)
                      )
                      .map((factor, i) =>
                        Object.assign(factor, { number: i + 1 })
                      )}
                    columns={FactorsResultColumns}
                    bordered
                    rowHoverable={false}
                    pagination={false}
                  />
                </div>
              )}

              <div>
                <h2 style={{ textAlign: "left", margin: "0 12%" }}>
                  {ecologicalFactorsList.length > 0 ||
                  managementFactorsList.length > 0
                    ? "Прочие рекомендации"
                    : "Рекомендации"}
                </h2>
              </div>
            </ConfigProvider>
          </div>
        )}
      </main>
    </>
  );
});
