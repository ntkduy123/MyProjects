import React, { Component } from 'react'
import { Radio, Card, Spin, Row, Col, Avatar } from 'antd'
import { connect } from 'react-redux'
import { getPostList } from '../../../appRedux/actions/Blog'
import PostCard from 'routes/Blog/Component/PostCard'

class PostList extends Component {
  componentDidMount = () => {
    this.props.getPostList()
  }

  render() {
    const { loading, postList } = this.props

    return (
      <div className="gx-main-content gx-pb-sm-4">
      <Row>
        <Col span={24}>
          <Card className="gx-card" size="small">
            <Spin spinning={loading} size="large">
              <div className="ant-row-flex gx-justify-content-between gx-mb-3 gx-dash-search">
                <h2 className="h4 gx-mb-3 gx-mb-sm-1 gx-mr-2">Blog posts</h2>
                <div className="gx-mx-sm-2">
                  <Radio.Group className="gx-radio-group-link gx-radio-group-link-news" defaultValue={0}
                              onChange={this.handleChange}>
                    <Radio.Button value={0} className="gx-mb-1">All</Radio.Button>
                    <Radio.Button value={1} className="gx-mb-1">Bitcoin</Radio.Button>
                    <Radio.Button value={2} className="gx-mb-1">Ripple</Radio.Button>
                    <Radio.Button value={3} className="gx-mb-1">Litecoin</Radio.Button>
                  </Radio.Group>
                </div>
                <span className="gx-ml-2 gx-search-icon"><i
                  className="icon icon-search-new gx-text-primary gx-fs-xxl gx-pointer"/></span>
              </div>

              {
                postList.map((data, index) => <PostCard key={index} data={data}/>)
              }
            </Spin>
          </Card>
        </Col>
      </Row>
      </div>
    )
  }
}

const mapStateToProps = ({ blog }) => {
  const { postList, loading } = blog
  return { postList, loading }
}

export default connect(mapStateToProps, { getPostList })(PostList)
