import React, { Component } from 'react'
import {
  Button,
  Checkbox,
  Drawer,
  Dropdown,
  Menu,
  message
} from 'antd'
import PropTypes from 'prop-types'

import CustomScrollbars from 'util/CustomScrollbars'
import ToDoList from 'components/Todo/ToDoList'
import ToDoDetail from 'components/Todo/ToDoDetail/index'
import CircularProgress from 'components/CircularProgress/index'
import Auxiliary from 'util/Auxiliary'
import labels from './data/labels'
import options from './data/options'

const ITEM_HEIGHT = 34

class ToDo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      drawerState: false
    }
  }

  componentDidMount() {
    this.manageHeight()
    const {
      getAllTask, getAllTaskType, getAllTaskLabel, getAllTaskStatus
    } = this.props
    getAllTask()
    getAllTaskType()
    getAllTaskLabel()
    getAllTaskStatus()
  }

  componentDidUpdate() {
    this.manageHeight()
  }

  onToggleDrawer = () => {
    const { drawerState } = this.state
    this.setState({
      drawerState: !drawerState
    })
  }

  getNavFilters = () => {
    const { taskStatusList } = this.props
    return taskStatusList.map(taskStatus => (
      <li
        key={taskStatus.id}
        onClick={() => {
          setTimeout(() => {
            this.setState({ loader: false })
          }, 1500)
        }
      }
      >
        <span className="gx-link">
          <i className={`icon icon-${taskStatus.icon}`} />
          <span>{taskStatus.name}</span>
        </span>
      </li>
    ))
  }

  getNavLabels = () => {
    const { taskLabelList } = this.props
    return taskLabelList.map((taskLabel, index) => (
      <li
        key={taskLabel.id}
        onClick={() => {
          setTimeout(() => {
            this.setState({ loader: false })
          }, 1500)
        }
      }
      >
        <span className="gx-link">
          <i className={`icon icon-circle gx-text-${taskLabel.color}`} />
          <span>{taskLabel.name}</span>
        </span>
      </li>
    ))
  }

  ToDoSideBar = () => {
    const { taskList } = this.props
    return (
      <div className="gx-module-side">
        <div className="gx-module-side-header">
          <div className="gx-module-logo">
            <i className="icon icon-check-circle-o gx-mr-4" />
            {'Todo App'}
          </div>
        </div>
        <div className="gx-module-side-content">
          <CustomScrollbars className="gx-module-side-scroll">
            <div className="gx-module-add-task">
              <Button
                variant="raised"
                type="primary"
                className="gx-btn-block"
                onClick={() => {
                  this.setState({ addTodo: true })
                }}
              >
                {' '}
                {'ADD TASK'}
                {' '}
              </Button>
            </div>
            <ul className="gx-module-nav">
              <li onClick={() => {
                this.setState({
                  currentTodo: null
                })
              }
              }
              >
                <span className="gx-link active">
                  <i className="icon icon-all-contacts gx-pt-1" />
                  <span>All</span>
                </span>
              </li>
              <li className="gx-module-nav-label">Filters</li>
              {this.getNavFilters()}
              <li className="gx-module-nav-label">Labels</li>
              {this.getNavLabels()}
            </ul>
          </CustomScrollbars>
        </div>
      </div>
    )
  }

  showToDos = () => {
    const { taskList } = this.props
    return (
      <ToDoList
        taskList={taskList}
        useDragHandle={true}
      />
    )
  }

  optionMenu = () => (
    <Menu
      id="option-menu"
      onClick={this.onOptionMenuItemSelect}
      onClose={this.handleRequestClose}
      style={{ maxHeight: ITEM_HEIGHT * 5.5 }}
    >
      {options.map(option => (
        <Menu.Item key={option.title}>
          {option.title}
        </Menu.Item>
      ),)}
    </Menu>
  )

  labelMenu = () => (
    <Menu
      id="label-menu"
      onClick={this.onLabelMenuItemSelect}
      onClose={this.handleRequestClose}
      style={{ maxHeight: ITEM_HEIGHT * 4.5 }}
    >
      {labels.map(label => (
        <Menu.Item key={label}>
          {label.title}
        </Menu.Item>
      ),)}
    </Menu>
  )

  manageHeight() {
  }

  render() {
    const { drawerState } = this.state

    return (
      <div className="gx-main-content">
        <div className="gx-app-module">
          <div className="gx-d-block gx-d-lg-none">
            <Drawer
              placement="left"
              closable={false}
              visible={drawerState}
              onClose={this.onToggleDrawer}
            >
              {this.ToDoSideBar()}
            </Drawer>
          </div>
          <div className="gx-module-sidenav gx-d-none gx-d-lg-flex">
            {this.ToDoSideBar()}
          </div>

          <div className="gx-module-box">
            <div className="gx-module-box-header">

              <span className="gx-drawer-btn gx-d-flex gx-d-lg-none">
                <i
                  className="icon icon-menu gx-icon-btn"
                  aria-label="Menu"
                  onClick={this.onToggleDrawer}
                />
              </span>
              {/* <AppModuleHeader
                placeholder="Search To Do"
                user={this.state.user}
                onChange={this.updateSearch.bind(this)}
                value={this.state.searchTodo}
              /> */}
            </div>
            <div className="gx-module-box-content">
              { this.showToDos(this.state) }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ToDo.propTypes = {
  getAllTask: PropTypes.func.isRequired,
  getAllTaskLabel: PropTypes.func.isRequired,
  getAllTaskType: PropTypes.func.isRequired,
  getAllTaskStatus: PropTypes.func.isRequired,
  taskStatusList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  taskList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  taskLabelList: PropTypes.arrayOf(PropTypes.shape()).isRequired
}

export default ToDo
