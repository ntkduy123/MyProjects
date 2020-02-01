import React, { Component } from 'react'
import {
  Card, Spin, Row, Col
} from 'antd'
import draftToHtml from 'draftjs-to-html'
import PropTypes from 'prop-types'

class Post extends Component {
  componentDidMount = () => {
    const { getPost, match } = this.props
    const { params } = match
    if (params.id) {
      getPost(params.id)
    }
  }

  render() {
    const { selectedPost } = this.props
    const content = selectedPost.content ? draftToHtml(JSON.parse(selectedPost.content)) : ''

    return (
      <div className="gx-main-content gx-pb-sm-4">
        <Row>
          <Col span={24}>
            <Card title={selectedPost.title} headStyle={{ fontSize: '40px' }}>
              <Spin spinning={false} size="large">
                <div className="post" dangerouslySetInnerHTML={{ __html: content }} />
              </Spin>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  match: PropTypes.shape().isRequired,
  selectedPost: PropTypes.shape().isRequired
}

export default Post
