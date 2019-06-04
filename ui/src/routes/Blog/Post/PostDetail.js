import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Spin, Row, Col } from 'antd'
import { getPost } from 'appRedux/actions/Blog'

class PostDetail extends Component {
  componentDidMount = () => {
    const { getPost } = this.props
    const { params } = this.props.match
    if (params.id) {
      getPost(params.id)
    }
  }

  render() {
    const { selectedPost } = this.props

    return (
      <div className="gx-main-content gx-pb-sm-4">
        <Row>
          <Col span={24}>
            <Card className="gx-card" size="small">
              <Spin spinning={false} size="large">
                <div className="ant-row-flex gx-justify-content-between gx-mb-3 gx-dash-search">
                  <h2 className="h4 gx-mb-3 gx-mb-sm-1 gx-mr-2">{selectedPost.title}</h2>
                  <span className="gx-ml-2 gx-search-icon"><i
                    className="icon icon-search-new gx-text-primary gx-fs-xxl gx-pointer"/></span>
                </div>
              </Spin>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = ({ blog }) => {
  const { selectedPost, loading } = blog
  return { selectedPost, loading }
}

export default connect(mapStateToProps, { getPost })(PostDetail)
