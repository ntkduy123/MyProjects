import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Table, Button } from 'antd'
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
      <Link to={`/admin/post-form/${id}`}>Edit</Link>
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
        <Button type="primary" style={{ marginBottom: 16 }}>
          <Link to="/admin/post-form">Write new post</Link>
        </Button>
      </Card>
    )
  }
}

PostTable.propTypes = {
  getPostList: PropTypes.func.isRequired,
  postList: PropTypes.arrayOf().isRequired
}

export default PostTable
