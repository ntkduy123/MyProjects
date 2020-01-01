import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Table } from 'antd'
import PropTypes from 'prop-types'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: 'Category',
    dataIndex: 'postCategory',
    key: 'category',
    render: category => (
      <span>{category.name}</span>
    )
  },
  {
    title: 'Status',
    dataIndex: 'postStatus',
    key: 'status',
    render: status => (
      <span>{status.name}</span>
    )
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'id',
    render: id => (
      <Link to={`/blog/post-form/${id}`}>Edit</Link>
    ),
  }
]

class PostTable extends Component {
  componentDidMount = () => {
    const { getPostList } = this.props
    getPostList()
  }

  render() {
    const { postList } = this.props
    return (
      <Card title="Post Table">
        <Table className="gx-table-responsive" columns={columns} dataSource={postList} />
      </Card>
    )
  }
}

PostTable.propTypes = {
  getPostList: PropTypes.func.isRequired,
  postList: PropTypes.arrayOf().isRequired
}

export default PostTable
