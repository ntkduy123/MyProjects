import React from 'react'
import {
  Avatar,
  Badge,
  Col,
  DatePicker,
  Input,
  Menu,
  Row
} from 'antd'
import Moment from 'moment'
import CustomScrollbars from 'util/CustomScrollbars'

import labels from 'routes/inBuiltApps/Todo/data/labels'
import users from 'routes/inBuiltApps/Todo/data/users'

class ToDoDetail extends React.Component {
  optionMenu = () => (
    <Menu
      id="label-menu"
      onClick={this.handleRequestClose}
      onClose={this.handleRequestClose}
    >
      {users.map((user, index) => (
        <Menu.Item key={index} value={user.id}>
          <div className="gx-d-flex gx-user-name gx-align-items-center">
            <Avatar src={user.thumb} alt={user.name} />
            <h4>{user.name}</h4>
          </div>
        </Menu.Item>
      ))}

    </Menu>
  )

  labelMenu = () => {
    const { taskLabels } = this.props
    return (
      <Menu id="label-menu" onClick={this.handleRequestClose()}>
        {taskLabels.map(label => (
          <Menu.Item key={label.id}>
            {label.title}
          </Menu.Item>
        ),)}
      </Menu>
    )
  }

  render() {
    const { onToDoUpdate, onDeleteToDo } = this.props
    const {
      todo, editNote, editTitle, title, notes, message, conversation
    } = this.state
    let user = null
    if (todo.user > 0) user = users.find(user => user.id === todo.user)

    return (
      <div className="gx-module-detail gx-module-list">
        <CustomScrollbars className="gx-todo-detail-content-scroll">
          <div className="gx-module-detail-item gx-module-detail-header">
            <Row>
              <Col xs={24} sm={12} md={17} lg={12} xl={17}>
                <div className="gx-flex-row">
                  <div
                    className="gx-user-name gx-mr-md-4 gx-mr-2 gx-my-1"
                    onClick={this.handleUserClick}
                  >

                    {user === null ? <h4 className="gx-mb-0 gx-pointer">Assign User </h4>
                      : (
                        <div className="gx-flex-row gx-align-items-center gx-pointer">
                          <Avatar className="gx-mr-2" src={user.thumb} alt={user.name} />
                          <h4 className="gx-mb-0">{user.name}</h4>
                        </div>
                      )}
                  </div>
                  <DatePicker
                    className="gx-module-date gx-my-1"
                    defaultValue={todo.dueDate !== null ? Moment(todo.dueDate, 'dddd, MMMM DD, YYYY h:mm a') : undefined}
                    invalidLabel="Due Date"
                    format="MMMM DD, YYYY"
                    onChange={this.handleDueDateChange.bind(this)}
                    animateYearScrolling={false}
                  />


                </div>
              </Col>

              <Col xs={24} sm={12} md={7} lg={12} xl={7}>
                <div className="gx-flex-row gx-justify-content-between">
                  <i
                    className="gx-icon-btn icon icon-trash"
                    onClick={() => {
                      onDeleteToDo(todo)
                    }}
                  />

                  <span
                    className="gx-d-block"
                    onClick={() => {
                      todo.starred = !todo.starred
                      onToDoUpdate(todo)
                    }}
                  >
                    {todo.starred
                      ? <i className="gx-icon-btn icon icon-star" />
                      : <i className="gx-icon-btn icon icon-star-o" />
                        }

                  </span>

                  <span
                    className="gx-d-block"
                    onClick={() => {
                      todo.important = !todo.important
                      onToDoUpdate(todo)
                    }}
                  >
                    {todo.important
                      ? <i className="gx-icon-btn icon icon-important" />
                      : <i className="gx-icon-btn icon icon-important-o" />
                        }

                  </span>
                  <span className="gx-d-block" onClick={this.handleLabelClick}>
                    <i className="gx-icon-btn icon icon-tag" />
                  </span>


                </div>
              </Col>
            </Row>
          </div>

          <div className="gx-module-detail-item">

            <div className="gx-mb-md-4 gx-mb-2">
              {labels.map((label, index) => (todo.labels).includes(label.id)
                  && <Badge key={index} count={label.title} style={{ backgroundColor: label.color }} />)}
            </div>

            <div className="gx-form-group gx-flex-row gx-align-items-center gx-mb-0 gx-flex-nowrap">
              <div onClick={(event) => {
                todo.completed = !todo.completed
                onToDoUpdate(todo)
              }}
              >
                {todo.completed
                  ? (
                    <span
                      className="gx-border-2 gx-size-30 gx-rounded-circle gx-text-green gx-border-green gx-d-block gx-text-center gx-pointer"
                    >
                      <i className="icon icon-check" />
                    </span>
                  )
                  : (
                    <span
                      className="gx-border-2 gx-size-30 gx-rounded-circle gx-text-muted gx-border-grey gx-d-block gx-text-center gx-pointer"
                    >
                      <i className="icon icon-check" />
                    </span>
                  )
                }
              </div>
              {editTitle
                ? (
                  <div className="gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1 gx-flex-nowrap">
                    <div className="gx-col">
                      <Input
                        fullWidth
                        className="gx-task-title"
                        id="required"
                        placeholder="Title"
                        onChange={event => this.setState({ title: event.target.value })}
                        defaultValue={title}
                      />
                    </div>

                    <span
                      className="gx-d-block gx-size-40 gx-text-center gx-pointer"
                      onClick={this.handleEditTitle}
                    >
                      <i className="gx-icon-btn icon icon-edit" />
                    </span>
                  </div>
                )
                : (
                  <div className="gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1 gx-flex-nowrap">
                    <div className="gx-task-title gx-col">
                      {title}
                    </div>
                    <span
                      className="gx-d-block gx-size-40 gx-text-center gx-pointer"
                      onClick={this.handleEditTitle}
                    >
                      <i className="gx-icon-btn icon icon-edit" />
                    </span>

                  </div>
                )}
            </div>

          </div>

          <div className="gx-module-detail-item gx-mb-md-4 gx-mb-2">
            {editNote
              ? (
                <div className="gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1 gx-flex-nowrap">
                  <div className="gx-task-input gx-col">
                    <Input
                      fullWidth
                      id="required"
                      placeholder="Note"
                      onChange={event => this.setState({ notes: event.target.value })}
                      defaultValue={notes}
                    />
                  </div>

                  <span className="gx-d-block gx-size-40 gx-text-center gx-pointer" onClick={this.handleEditNote}>
                    <i className="gx-icon-btn icon icon-edit" />
                  </span>
                </div>
              )
              : (
                <div className="gx-flex-row gx-align-items-center gx-justify-content-between gx-flex-1 gx-flex-nowrap">
                  <div className="gx-task-des gx-col">
                    {notes === '' ? 'Add note here' : notes}
                  </div>
                  <span
                    className="gx-d-block gx-size-40 gx-text-center gx-pointer"
                    onClick={this.handleEditNote}
                  >
                    <i className="gx-icon-btn icon icon-edit" />
                  </span>

                </div>
              )}
          </div>
          <div className="gx-module-detail-item">
            <h3 className="gx-mb-0 gx-mb-sm-1">Comments</h3>
          </div>

        </CustomScrollbars>
      </div>
    )
  }
}

export default ToDoDetail
