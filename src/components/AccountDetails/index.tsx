import { Card, Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSpecificAccount } from "../../api/api_accounts";
import "./index.css";

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
  const params : any = useParams();

  useEffect(() => {
    getSpecificAccount(params.accountId)
      .then((res) => {
        setDetails(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="site-card-wrapper">
      <h6 style={{fontSize:'25px',color:'blueviolet'}}>Accounts Details : </h6>
      <Row gutter={16}>
        <Col span={12} >
          <Card title="Username" bordered={false} className={'card'}>
            {details?.username}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="DisplayName" bordered={false} className={'card'}>
            {details?.displayName}
          </Card>
        </Col>
      </Row>
      <br />
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Followers Count" bordered={false} className={'card'}>
            {details?.followersCount}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Friends Count" bordered={false} className={'card'}>
            {details?.friendsCount}
          </Card>
        </Col>
      </Row>
      <br />
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Influence Score" bordered={false} className={'card'}>
            {details?.influenceScore.toFixed(3)}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Like H-Index Score" bordered={false} className={'card'}>
            {details?.likeHIndexScore}
          </Card>
        </Col>
      </Row>
      <br />
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Statuses Count" bordered={false} className={'card'}>
            {details?.statusesCount}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Retweet H-Index Score" bordered={false} className={'card'}>
            {details?.reTweetHIndexScore}
          </Card>
        </Col>
      </Row>
      <br />
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Tweets Credibility Score" bordered={false} className={'card'}>
            {details?.tweetsCredibilityScore.toFixed(3)}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="User Reputation Score" bordered={false} className={'card'}>
            {details?.userReputationScore.toFixed(3)}
          </Card>
        </Col>
      </Row>
      <br />
    </div>
  );
};

export default AccountDetails;
