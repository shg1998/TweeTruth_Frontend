import { Card, Col, Row, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSpecificAccount } from "../../api/api_accounts";
import "./index.css";
import { TwitterOutlined, IdcardOutlined,FileProtectOutlined } from "@ant-design/icons";

interface PropsTypes {
  selectedId: number;
}

interface TweetType {
  likeCount: number;
  reTweetCount: number;
  replyCount: number;
  tweetContent: string;
  tweetDate: string;
  tweetUrl: string;
  userName: string;
}

interface DetailsType {
  createdTime: string;
  description: string;
  descriptionUrl: string;
  displayName: string;
  followersCount: number;
  friendsCount: number;
  influenceScore: number;
  likeHIndexScore: number;
  linkUrl: string;
  location: string;
  profileBannerUrl: string;
  profileImageUrl: string;
  rawDescription: string;
  reTweetHIndexScore: number;
  statusesCount: number;
  tweetsCredibilityScore: number;
  userReputationScore: number;
  username: string;
  tweets: Array<TweetType>;
}

const AccountDetails: React.FC<PropsTypes> = ({ selectedId }) => {
  const [details, setDetails] = useState<DetailsType>();
  const params: any = useParams();
  const { Meta } = Card;

  useEffect(() => {
    getSpecificAccount(params.accountId)
      .then((res) => {
        setDetails(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const goToOriginalTweetUrl = (url: string) => {
    window.open(url);
  };

  return (
    <div className="site-card-wrapper">
      <Row>
        <Col>
          <IdcardOutlined style={{ fontSize: "230%", marginRight: "3px" }} />
        </Col>
        <Col>
          <h6 style={{ fontSize: "25px", color: "blueviolet" }}>
            Accounts Details :
          </h6>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={4} sm={24} md={4} xs={24}>
          <Card
            bordered={false}
            className={"card"}
            hoverable
            cover={
              <img
                src={details?.profileImageUrl}
                alt="Profile Image"
                height={150}
              />
            }
          >
            <Meta title="Profile Image" />
          </Card>
        </Col>
        <Col span={20} sm={24} md={20} xs={24}>
          <Card
            bordered={false}
            className={"card"}
            hoverable
            cover={
              <img
                src={details?.profileBannerUrl}
                alt="Banner Image"
                height={150}
              />
            }
          >
            <Meta title="Profile Banner Image" />
          </Card>
        </Col>
      </Row>
      <br />
      <Row gutter={16}>
        <Col span={8} sm={24} md={8} xs={24}>
          <Card title="Username" bordered={false} className={"card"} hoverable>
            {details ? details.username : "No Data"}
          </Card>
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <Card
            title="DisplayName"
            bordered={false}
            className={"card"}
            hoverable
          >
            {details ? details.displayName : "No Data"}
          </Card>
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <Card
            title="Creation Time"
            bordered={false}
            className={"card"}
            hoverable
          >
            {details ? details.createdTime : "No Data"}
          </Card>
        </Col>
      </Row>
      <br />
      <Row gutter={16}>
        <Col span={8} sm={24} md={8} xs={24}>
          <Card
            title="Followers Count"
            bordered={false}
            className={"card"}
            hoverable
          >
            {details ? details.followersCount : "No Data"}
          </Card>
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <Card
            title="Friends Count"
            bordered={false}
            className={"card"}
            hoverable
          >
            {details ? details.friendsCount : "No Data"}
          </Card>
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <Card
            title="Statuses Count"
            bordered={false}
            className={"card"}
            hoverable
          >
            {details ? details.statusesCount : "No Data"}
          </Card>
        </Col>
      </Row>
      <br />
      <Row gutter={16}>
        <Col span={24} sm={24} md={24} xs={24}>
          <Card
            title="Description"
            bordered={false}
            className={"card"}
            hoverable
          >
            {details ? details.description : "No Data"}
          </Card>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <FileProtectOutlined style={{ fontSize: "230%" }} />
        </Col>
        <Col>
          <h6 style={{ fontSize: "25px", color: "blueviolet" }}>
            Conclusions :{" "}
          </h6>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12} sm={24} md={12} xs={24}>
          <Card
            title="Influence Score"
            bordered={false}
            className={"card"}
            hoverable
          >
            {details ? details.influenceScore.toFixed(3) : "No Data"}
          </Card>
        </Col>
        <Col span={12} sm={24} md={12} xs={24}>
          <Card
            title="Tweets Credibility Score"
            bordered={false}
            className={"card"}
            hoverable
          >
            {details ? details.tweetsCredibilityScore.toFixed(3) : "No Data"}
          </Card>
        </Col>
      </Row>
      <br />
      <Row gutter={16}>
        <Col span={8} sm={24} md={8} xs={24}>
          <Card
            title="Like H-Index Score"
            bordered={false}
            className={"card"}
            hoverable
          >
            {details ? details.likeHIndexScore : "No Data"}
          </Card>
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <Card
            hoverable
            title="User Reputation Score"
            bordered={false}
            className={"card"}
          >
            {details ? details.userReputationScore.toFixed(3) : "No Data"}
          </Card>
        </Col>
        <Col span={8} sm={24} md={8} xs={24}>
          <Card
            hoverable
            title="Retweet H-Index Score"
            bordered={false}
            className={"card"}
          >
            {details ? details.reTweetHIndexScore : "No Data"}
          </Card>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <TwitterOutlined style={{ fontSize: "230%" }} />
        </Col>
        <Col>
          <h6 style={{ fontSize: "25px", color: "blueviolet" }}>
            Some Tweets :{" "}
          </h6>
        </Col>
      </Row>

      {details?.tweets.slice(0, 5).map((tweet, index) => {
        return (
          <Row gutter={16} key={index}>
            <Tooltip title={"Click for Going to Original Tweet"}>
              <Card
                title={
                  "Released at " +
                  tweet.tweetDate +
                  "  ( like count : " +
                  tweet.likeCount +
                  " , retweet count: " +
                  tweet.reTweetCount +
                  " , reply count: " +
                  tweet.replyCount +
                  " )"
                }
                bordered={false}
                className={"tweet-card"}
                hoverable
                onClick={() => goToOriginalTweetUrl(tweet.tweetUrl)}
              >
                {tweet.tweetContent}
              </Card>
            </Tooltip>
          </Row>
        );
      })}
    </div>
  );
};

export default AccountDetails;
