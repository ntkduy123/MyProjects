import React, { Component } from 'react'
import {
  Button,
  Checkbox,
  Drawer,
  Dropdown,
  Menu,
  message
} from 'antd'

import CustomScrollbars from 'util/CustomScrollbars'
import ToDoList from 'components/Todo/ToDoList'
import ToDoDetail from 'components/Todo/ToDoDetail/index'
import CircularProgress from 'components/CircularProgress/index'
import Auxiliary from 'util/Auxiliary'
import toDo from './data/todo'
import filters from './data/filters'
import labels from './data/labels'
import options from './data/options'
import todoConversation from './data/todoConversation'

const ITEM_HEIGHT = 34

class ToDo extends Component {
  constructor() {
    super()
    this.state = {
      searchTodo: '',
      alertMessage: '',
      loader: false,
      showMessage: false,
      drawerState: false,
      optionName: 'None',
      anchorEl: null,
      allToDos: toDo,
      currentTodo: null,
      user: {
        name: 'Robert Johnson',
        email: 'robert.johnson@example.com',
        avatar: 'https://via.placeholder.com/150x150'
      },
      selectedToDos: 0,
      labelMenuState: false,
      optionMenuState: false,
      toDos: toDo,
      filter: -1,
      todoConversation,
      conversation: null
    }
  }

  componentDidMount() {
    this.manageHeight()
  }

  componentDidUpdate() {
    this.manageHeight()
  }

  onTodoChecked(data) {
    const { toDos } = this.state
    data.selected = !data.selected
    let selectedToDos = 0
    const newToDos = toDos.map((todo) => {
      if (todo.selected) {
        selectedToDos++
      }
      if (todo.id === data.id) {
        if (todo.selected) {
          selectedToDos++
        }
        return data
      } else {
        return todo
      }
    })
    this.setState({
      selectedToDos,
      newToDos
    })
  }

  onAllTodoSelect() {
    const { selectedToDos, toDos } = this.state
    const selectAll = selectedToDos < toDos.length
    if (selectAll) {
      this.getAllTodo()
    } else {
      this.getUnselectedAllTodo()
    }
  }

  onTodoAdd(data) {
    const { allToDos } = this.state
    this.setState(
      {
        toDos: allToDos.concat(data),
        allToDos: allToDos.concat(data)
      }
    )
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { toDos } = this.state
    this.setState({
      toDos: (toDos, oldIndex, newIndex),
    })
  }

  onLabelSelect = (event) => {
    const { labelMenuState } = this.state
    this.setState({
      anchorEl: event.currentTarget,
      labelMenuState: !labelMenuState
    })
  }

  onTodoSelect(todo) {
    let conversationList = this.getToDoConversation(todo.id)
    if (conversationList) {
      conversationList = conversationList.conversationData
    } else {
      conversationList = []
    }
    this.setState({
      currentTodo: todo,
      loader: true,
      conversation: conversationList
    })
    setTimeout(() => {
      this.setState({ loader: false })
    }, 1500)
  }

  onOptionMenuSelect = (event) => {
    const { optionMenuState } = this.state
    this.setState({
      anchorEl: event.currentTarget,
      optionMenuState: !optionMenuState
    })
  }

  onToggleDrawer() {
    this.setState({
      drawerState: !this.state.drawerState
    })
  }

  onOptionMenuItemSelect = (e) => {
    switch (e.key) {
      case 'All':
        this.handleRequestClose()
        this.getAllTodo()
        break
      case 'None':
        this.handleRequestClose()
        this.getUnselectedAllTodo()
        break
      case 'Starred':
        this.handleRequestClose()
        this.getStarredToDo()
        break
      case 'Unstarred':
        this.handleRequestClose()
        this.getUnStarredTodo()
        break
      case 'Important':
        this.handleRequestClose()
        this.getImportantToDo()
        break
      case 'Unimportant':
        this.handleRequestClose()
        this.getUnimportantToDo()
        break
      default:
        return ''
    }
  };

  getAllTodo = () => {
    const { allToDos } = this.state
    const toDos = allToDos.map(todo => (todo ? {
      ...todo,
      selected: true
    } : todo))
    this.setState({
      selectedToDos: toDos.length,
      allToDos: toDos,
      optionName: 'All',
      toDos
    })
  };

  getUnselectedAllTodo = () => {
    const { allToDos } = this.state
    const toDos = allToDos.map(todo => (todo ? {
      ...todo,
      selected: false
    } : todo))
    this.setState({
      selectedToDos: 0,
      allToDos: toDos,
      optionName: 'None',
      toDos
    })
  };

  getStarredToDo = () => {
    let selectedToDos = 0
    const { allToDos } = this.state
    const toDos = allToDos.map((todo) => {
      if (todo.starred) {
        selectedToDos++
        return { ...todo, selected: true }
      }
      return { ...todo, selected: false }
    })
    this.setState({
      selectedToDos,
      allToDos: toDos,
      toDos: toDos.filter(todo => !todo.deleted)
    })
    return toDos
  };

  getUnStarredTodo = () => {
    let selectedToDos = 0
    const { allToDos } = this.state
    const toDos = allToDos.map((todo) => {
      if (!todo.starred) {
        selectedToDos++
        return { ...todo, selected: true }
      }
      return { ...todo, selected: false }
    })
    this.setState({
      selectedToDos,
      allToDos: toDos,
      optionName: 'Unstarred',
      toDos: toDos.filter(todo => !todo.deleted)
    })
    return toDos
  };

  getImportantToDo = () => {
    let selectedToDos = 0
    const { allToDos } = this.state
    const toDos = allToDos.map((todo) => {
      if (todo.important) {
        selectedToDos++
        return { ...todo, selected: true }
      }
      return { ...todo, selected: false }
    })
    this.setState({
      selectedToDos,
      allToDos: toDos,
      optionName: 'Important',
      toDos: toDos.filter(todo => !todo.deleted)
    })
    return toDos
  };

  getUnimportantToDo = () => {
    let selectedToDos = 0
    const { allToDos } = this.state
    const toDos = allToDos.map((todo) => {
      if (!todo.important) {
        selectedToDos++
        return { ...todo, selected: true }
      }
      return { ...todo, selected: false }
    })
    this.setState({
      selectedToDos,
      allToDos: toDos,
      optionName: 'Unimportant',
      toDos: toDos.filter(todo => !todo.deleted)
    })

    return toDos
  };

  onLabelMenuItemSelect = (e) => {
    const label = +e.key
    this.handleRequestClose()
    const { allToDos } = this.state
    const toDos = allToDos.map((todo) => {
      if (todo.selected) {
        if (todo.labels.includes(label.id)) {
          return { ...todo, labels: this.removeLabel(todo, label.id) }
        } else {
          return { ...todo, labels: this.addLabel(todo, label.id) }
        }
      } else {
        return todo
      }
    })
    this.setState({
      alertMessage: 'Label Updated Successfully',
      showMessage: true,
      allToDos: toDos,
      toDos
    })
  }

  onLabelUpdate = (data, label) => {
    const { allToDos } = this.state
    if (data.labels.includes(label.id)) {
      data.labels = this.removeLabel(data, label.id)
    } else {
      data.labels = this.addLabel(data, label.id)
    }
    this.handleRequestClose()
    const toDos = allToDos.map((todo) => {
      if (todo.id === data.id) {
        return data
      } else {
        return todo
      }
    })

    this.setState({
      alertMessage: 'Label Updated Successfully',
      showMessage: true,
      currentTodo: data,
      allToDos: toDos,
      toDos,
    })
  };

  onMarkAsStart = (data) => {
    const { allToDos } = this.state
    const toDos = allToDos.map((todo) => {
      if (todo.id === data.id) {
        return data
      } else {
        return todo
      }
    })
    this.setState({
      alertMessage: 'ToDo Updated Successfully',
      showMessage: true,
      allToDos: toDos,
      toDos,
    })
  };

  onToDoUpdate = (data) => {
    const { allToDos } = this.state
    this.handleRequestClose()
    const toDos = allToDos.map((todo) => {
      if (todo.id === data.id) {
        return data
      } else {
        return todo
      }
    })
    this.setState({
      alertMessage: 'ToDo Updated Successfully',
      showMessage: true,
      currentTodo: data,
      allToDos: toDos,
      toDos,
    })
  };


  onDeleteToDo = (data) => {
    let selectedToDos = 0
    const { allToDos } = this.state
    const toDos = allToDos.map((todo) => {
      if (todo.selected) {
        selectedToDos++
      }
      if (data.id === todo.id) {
        if (todo.selected) {
          selectedToDos--
        }
        return { ...todo, deleted: true }
      } else {
        return todo
      }
    })
    this.setState({
      alertMessage: 'ToDo Deleted Successfully',
      showMessage: true,
      allToDos: toDos,
      currentTodo: null,
      selectedToDos,
      toDos: toDos.filter(todo => !todo.deleted)
    })
  }

  getNavFilters = () => {
    const { allToDos, selectedSectionId } = this.state
    return filters.map((filter, index) => (
      <li
        key={filter.id}
        onClick={() => {
          const filterMails = allToDos.filter((todo) => {
            if (filter.id === 0 && todo.starred) {
              return todo
            } else if (filter.id === 1 && todo.important) {
              return todo
            } else if (filter.id === 2 && todo.important) {
              return todo
            } else if (filter.id === 3 && todo.important) {
              return todo
            } else if (filter.id === 4 && todo.completed) {
              return todo
            } else if (filter.id === 5 && todo.deleted) {
              return todo
            } else return todo
          })
          this.setState({
            loader: true,
            currentTodo: null,
            filter: filter.id,
            toDos: filterMails
          })
          setTimeout(() => {
            this.setState({ loader: false })
          }, 1500)
        }
        }
      >
        <span className={filter.id === selectedSectionId ? 'gx-link active' : 'gx-link'}>
          <i className={`icon icon-${filter.icon}`} />
          <span>{filter.title}</span>
        </span>
      </li>
    ))
  }

  getNavLabels = () => {
    const { allToDos } = this.state
    return labels.map((label, index) => (
      <li
        key={label.id}
        onClick={() => {
          const filterMails = allToDos.filter(todo => todo.labels.includes(label.id))
          this.setState({
            loader: true,
            currentTodo: null,
            toDos: filterMails
          })
          setTimeout(() => {
            this.setState({ loader: false })
          }, 1500)
        }
        }
      >
        <span className="gx-link">
          <i className={`icon icon-circle gx-text-${label.color}`} />
          <span>{label.title}</span>
        </span>
      </li>
    ))
  }

  getToDoConversation(id) {
    return todoConversation.find(conversation => conversation.id === id)
  }

  searchTodo = (searchText) => {
    const { allToDos } = this.state
    if (searchText === '') {
      this.setState({ toDos: allToDos.filter(todo => !todo.deleted) })
    } else {
      const searchToDos = allToDos.filter(
        todo => !todo.deleted && todo.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      )
      this.setState({
        toDos: searchToDos
      })
    }
  }

  ToDoSideBar = () => {
    const { allToDos } = this.state
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
                  currentTodo: null,
                  toDos: allToDos
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

  handleRequestClose = () => {
    this.setState({
      showMessage: false, addTodo: false, labelMenuState: false, optionMenuState: false,
    })
  }

  showToDos = ({
    currentTodo, toDos, conversation, user
  }) => (currentTodo === null
    ? (
      <ToDoList
        toDos={toDos}
        onSortEnd={this.onSortEnd}
        onMarkAsStart={this.onMarkAsStart}
        onTodoSelect={this.onTodoSelect}
        onTodoChecked={this.onTodoChecked}
        useDragHandle={true}
      />
    )
    :      (
      <ToDoDetail
        todo={currentTodo}
        user={user}
        conversation={conversation}
        onLabelUpdate={this.onLabelUpdate}
        onToDoUpdate={this.onToDoUpdate}
        onDeleteToDo={this.onDeleteToDo}
      />
    ));

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

  removeLabel(todo, label) {
    todo.labels.splice(todo.labels.indexOf(label), 1)
    return todo.labels
  }

  addLabel(todo, label) {
    todo.labels = todo.labels.concat(label)
    return todo.labels
  }

  updateSearch(evt) {
    this.setState({
      searchTodo: evt.target.value,
    })
    this.searchTodo(evt.target.value)
  }

  manageHeight() {
  }

  render() {
    const {
      selectedToDos, loader, drawerState, toDos, alertMessage, showMessage, optionName, currentTodo
    } = this.state

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
                  onClick={this.onToggleDrawer.bind(this)}
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
              {currentTodo === null
                ? (
                  <div className="gx-module-box-topbar gx-module-box-topbar-todo">
                    {toDos.length > 0
                      ? (
                        <Auxiliary>
                          <Checkbox
                            className="gx-icon-btn"
                            color="primary"
                            indeterminate={selectedToDos > 0 && selectedToDos < toDos.length}
                            checked={selectedToDos > 0}
                            onChange={this.onAllTodoSelect}
                            value="SelectMail"
                          />
                          <Dropdown overlay={this.optionMenu()} placement="bottomRight" trigger={['click']}>
                            <div>
                              <span className="gx-px-2">
                                {' '}
                                {optionName}
                              </span>
                              <i className="icon icon-charvlet-down" />
                            </div>
                          </Dropdown>
                        </Auxiliary>
                      ) : null}

                    {( selectedToDos > 0)

                  && (
                  <Dropdown overlay={this.labelMenu()} placement="bottomRight" trigger={['click']}>
                    <i className="gx-icon-btn icon icon-tag" />
                  </Dropdown>
                  )
                  }
                  </div>
                )
                :                (
                  <div className="gx-module-box-topbar">
                    <i
                      className="icon icon-arrow-left gx-icon-btn"
                      onClick={() => {
                        this.setState({ currentTodo: null })
                      }}
                    />
                  </div>
                )
              }
              {loader
                ? (
                  <div className="gx-loader-view">
                    <CircularProgress />
                  </div>
                )
                : this.showToDos(this.state)
              }
            </div>
          </div>
        </div>
        {showMessage && message.info(<span id="message-id">{alertMessage}</span>, 3, this.handleRequestClose)}
      </div>
    )
  }
}

export default ToDo
