import React from 'react';
import { Row, Col } from 'antd';
import MainBoard from '../components/Widgets/MainBoard';
import HeatmapTodayPrem from '../components/Widgets/HeatmapTodayPrem';
import TodayPrem from '../components/Widgets/TodayPrem';
import PremTrend from '../components/Widgets/PremTrend';
import ProgressPanel from '../components/Widgets/ProgressPanel';
import BranchRank from '../components/Widgets/BranchRank';
import PremTop from '../components/Widgets/PremTop';
import HighlightPPeriod from '../components/Widgets/Highlight/PPeriod';
import HighlightBPeriod from '../components/Widgets/Highlight/BPeriod';
import HighlightSPrem from '../components/Widgets/Highlight/SPrem';
import HighlightPDay from '../components/Widgets/Highlight/PDay';
import RankTab from '../components/Widgets/RankTab';

const Dashboard = () => (
  <div>
    <Row gutter={16}>
      <Col xs={24} sm={24} md={18} lg={18} xl={18} style={{marginBottom:'12px'}}><ProgressPanel /></Col>
      <Col xs={24} sm={24} md={6} lg={6} xl={6} style={{marginBottom:'12px'}}><TodayPrem /></Col>
    </Row>
    <Row gutter={16}>
      <Col xs={24} sm={24} md={18} lg={18} xl={18}>
        <Row>
          <Col span={24} style={{marginBottom:'12px'}} ><MainBoard /></Col>
        </Row>
      </Col>
      <Col xs={24} sm={24} md={6} lg={6} xl={6}>
        <Row>
          <Col span={24} style={{marginBottom:'12px'}} ><HeatmapTodayPrem /></Col>
        </Row>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{marginBottom:'12px'}} ><PremTrend /></Col>
      <Col xs={24} sm={24} md={6} lg={6} xl={6} style={{marginBottom:'12px'}} ><RankTab data={[
        {indexCode:'001001',title:'首年期交',level:'T'},
        {indexCode:'012000',title:'个险首年标保',level:'T'},
      ]} /></Col>
      <Col xs={24} sm={24} md={6} lg={6} xl={6} style={{marginBottom:'12px'}} ><RankTab data={[
        {indexCode:'005000',title:'当日录单-市',level:'C'},
        {indexCode:'005000',title:'县',level:'T'},
        {indexCode:'005100',title:'当日生效-市',level:'C'},
        {indexCode:'005100',title:'县',level:'T'},
      ]} /></Col>
    </Row>
  </div>
)

export default Dashboard;