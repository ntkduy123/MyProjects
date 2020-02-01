import React, { Component } from 'react'
import {
  Radio, Card, Spin, Row, Col
} from 'antd'
import PostCard from 'components/Blog/PostList/PostListItem'
import PropTypes from 'prop-types'

class PostList extends Component {
  componentDidMount = () => {
    const { getPostList, getPostCategoryList } = this.props
    getPostList()
    getPostCategoryList()
  }

  render() {
    const {
      loading, postList = [], postCategoryList = [], getPostList
    } = this.props

    return (
      <div className="gx-main-content gx-pb-sm-4">
        <Row>
          <Col span={24}>
            <Card className="gx-card" size="small">
              <Spin spinning={loading} size="large">
                <div className="ant-row-flex gx-justify-content-between gx-mb-3 gx-dash-search">
                  <h2 className="h4 gx-mb-3 gx-mb-sm-1 gx-mr-2">Blog posts</h2>
                  <div className="gx-mx-sm-2">
                    <Radio.Group
                      className="gx-radio-group-link gx-radio-group-link-news"
                      defaultValue={0}
                      onChange={this.handleChange}
                    >
                      <Radio.Button
                        value={0}
                        className="gx-mb-1"
                        onClick={() => {
                          getPostList()
                        }}
                      >
                        {'All'}
                      </Radio.Button>
                      {
                        postCategoryList.map(category => (
                          <Radio.Button
                            key={category.id}
                            value={category.id}
                            className="gx-mb-1"
                            onClick={() => {
                              getPostList({
                                categoryId: category.id
                              })
                            }}
                          >
                            {category.name}
                          </Radio.Button>
                        ))
                      }
                    </Radio.Group>
                  </div>
                  <span className="gx-ml-2 gx-search-icon">
                    <i className="icon icon-search-new gx-text-primary gx-fs-xxl gx-pointer" />
                  </span>
                </div>

                {
                  postList.map((data, index) => <PostCard key={data} data={data} />)
                }
              </Spin>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

PostList.propTypes = {
  getPostList: PropTypes.func.isRequired,
  getPostCategoryList: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  postList: PropTypes.arrayOf().isRequired,
  postCategoryList: PropTypes.arrayOf().isRequired
}

export default PostList
