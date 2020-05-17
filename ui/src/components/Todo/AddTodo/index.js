import React, { Component } from 'react'
import {
  Form, Spin, Input, Card, Select, DatePicker, Button
} from 'antd'
import PropTypes from 'prop-types'

const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input

class AddTodo extends Component {
  componentDidMount = () => {
    const {
      getAllTaskType, getAllTaskLabel
    } = this.props
    getAllTaskType()
    getAllTaskLabel()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { form, saveOrUpdateTask } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        const newTask = {
          title: values.title,
          description: values.description,
          reporter: {
            id: 1
          },
          assignee: {
            id: 1
          },
          taskType: {
            id: values.category
          },
          taskStatus: {
            id: 1
          },
          taskLabels: values.labels.map(label => ({
            id: label
          })),
          dueDate: values.dueDate.unix()
        }
        saveOrUpdateTask(newTask)
      }
    })
  }

  render() {
    const {
      form,
      loading,
      taskLabelList,
      taskTypeList
    } = this.props
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    }

    return (
      <div className="gx-main-content">
        <div className="gx-app-module">
          <div className="gx-module-box">
            <Card>
              <Spin spinning={loading} size="large">
                <div className="gx-module-box-content">
                  <Form onSubmit={this.handleSubmit}>
                    <FormItem
                      label="Title"
                      {...formItemLayout}
                    >
                      {getFieldDecorator('title', {
                        initialValue: '',
                        rules: [{ required: true, message: 'Please input task title!' }]
                      })(<Input />)}
                    </FormItem>
                    <FormItem
                      label="Description"
                      {...formItemLayout}
                    >
                      {getFieldDecorator('description', {
                        initialValue: '',
                        rules: [{ required: true, message: 'Please input task description!' }]
                      })(<TextArea rows={4} />)}
                    </FormItem>
                    <FormItem
                      label="Category"
                      {...formItemLayout}
                    >
                      {getFieldDecorator('category', {
                        initialValue: 1
                      })(
                        <Select className="gx-mr-3 gx-mb-3">
                          {taskTypeList.map(category => (
                            <Option key={category.id} value={category.id}>{category.name}</Option>
                          ))}
                        </Select>
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="Labels"
                    >
                      {getFieldDecorator('labels', {
                        rules: [
                          { required: true, message: 'Please select your labels!', type: 'array' },
                        ],
                      })(
                        <Select mode="multiple" placeholder="Please select labels">
                          {taskLabelList.map(label => (
                            <Option key={label.id} value={label.id}>{label.name}</Option>
                          ))}
                        </Select>
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="Due Date"
                    >
                      {getFieldDecorator('dueDate', config)(
                        <DatePicker className="gx-mb-3 gx-w-100" />
                      )}
                    </FormItem>
                    <FormItem
                      wrapperCol={{ xs: 24, sm: { span: 12, offset: 5 } }}
                    >
                      <Button type="primary" htmlType="submit">
                        {'Submit'}
                      </Button>
                    </FormItem>
                  </Form>
                </div>
              </Spin>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

AddTodo.propTypes = {
  loading: PropTypes.bool.isRequired,
  getAllTaskLabel: PropTypes.func.isRequired,
  getAllTaskType: PropTypes.func.isRequired,
  form: PropTypes.shape().isRequired,
  taskLabelList: PropTypes.arrayOf().isRequired,
  taskTypeList: PropTypes.arrayOf().isRequired,
  saveOrUpdateTask: PropTypes.func.isRequired
}

export default AddTodo
