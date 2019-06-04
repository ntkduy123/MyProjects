import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPostList } from '../../../appRedux/actions/Blog'
import { Card, Table } from 'antd'

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
    render: (category) => (
      <span>{category.name}</span>
    )
  },
  {
    title: 'Status',
    dataIndex: 'postStatus',
    key: 'status',
    render: (status) => (
      <span>{status.name}</span>
    )
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'id',
    render: (id) => (
      <Link to={`/blog/post-form/${id}`}>Edit</Link>
    ),
  }
]

class PostTable extends Component {
  componentDidMount = () => {
    this.props.getPostList()
  }

  render() {
    const { postList } = this.props
    return (
      <Card title="Post Table">
        <Table className="gx-table-responsive" columns={columns} dataSource={postList}/>
      </Card>
    )
  }
}

const mapStateToProps = ({ blog }) => {
  const { postList, loading } = blog
  return { postList, loading }
}

export default connect(mapStateToProps, { getPostList })(PostTable)
