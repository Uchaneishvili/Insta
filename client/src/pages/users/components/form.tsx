import React, { FC } from "react";
import { Form, Row, Col, InputNumber, Input, Select, Card } from "antd";
import { FormInstance } from "antd/lib/form";
import { IType } from "../../../types/users";

type Props = {
  form: FormInstance;
};

const UserForm: FC<Props> = (props) => {
  const { Option } = Select;

  return (
    <>
      <Card>
        <Form layout="vertical" form={props.form}>
          <Row>
            <Col span={9}>
              <Form.Item
                name="userName"
                label={"მომხმარებლის / თეგის სახელი"}
                rules={[
                  {
                    required: true,
                    message: "ველის შევსება სავალდებულოა",
                  },
                ]}
              >
                <Input style={{ width: 240 }} />
              </Form.Item>
              <Form.Item
                name="password"
                label={"პაროლი"}
                rules={[
                  {
                    required: true,
                    message: "ველის შევსება სავალდებულოა",
                  },
                ]}
              >
                <Input.Password style={{ width: 240 }} />
              </Form.Item>
              <Form.Item name="type" label={"ტიპი"}>
                <Select
                  disabled={true}
                  size="large"
                  placeholder="Tag / User"
                  style={{ width: "100%" }}
                >
                  <Option value={IType.USER}>User</Option>
                  <Option value={IType.TAG}>Tag</Option>
                </Select>
              </Form.Item>

              {props.form.getFieldValue("type") == 1 && (
                <Form.Item
                  name="mediaCount"
                  label="Media Count"
                  rules={[
                    {
                      required: true,
                      message: "ველის შევსება სავალდებულოა",
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    size="large"
                    placeholder="The number of media"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              )}
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default UserForm;
