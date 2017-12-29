import React from 'react';
import { Row, Col,Table,Input,Card,Checkbox,Button,Select ,Cascader,DatePicker,Breadcrumb,Alert,Spin} from 'antd';
import moment from 'moment';
import Branch from './branch.json'
import Province from './Province.json'
import City from './City.json'
import _superagent from 'superagent';
import Style from './styles.css'
console.log(Style)
const { MonthPicker } = DatePicker;
const { Column, ColumnGroup } = Table;
const dateFormat = 'YYYY-MM-DD';
const { TextArea } = Input;
const Option = Select.Option;
const nowYear = moment().format('YYYY');
const lastYear = moment().add(-1,'year').format('YYYY');
const nowMonth = moment().format('YYYY-MM');
const lastMonth = moment().add(-1,'month').format('YYYY-MM');
const nowDate = moment().format('YYYY-MM-DD');
const lastDate = moment().add(-1,'day').format('YYYY-MM-DD');
var maxNum = 0;
var Num = 0;
var flagBranch = '';
const URL = '/api/report-builder/';
//const URL = '/';
class Home extends React.Component {
	state = {
        data:{
			columns:[],
			report:[],
			term_info:[]
		},
        param:{
            
        },
		code: null,
	  	location:[{
			label: '省公司',
			value: '610000'
		}],
		loading:true,
		branch_level:'',
		branch_level_down:'',
		is_total:'0'
	}
    componentWillMount() {
//        if(this.props.data){
//            this.setState({
//                data:this.props.data
//            })
//        }
		var code = this.props.code;
		this.setState({
			code:code
		})
		if(code!== undefined && code != 0 && code != ''){
			_superagent
			.post(URL+''+code+'/table')
			.set("Content-Type", "application/json")
			.send('{}')
		  	.then(res=>{
				var data = res.body.data;
				var obj = {};
				obj.columns  = JSON.parse(data.columns);
				obj.term_info  = data.term_info;
				obj.report  = data.report;
				obj.branch_level  = data.branch_level;
				obj.branch_level_down  = data.branch_level_down;
				this.setState({
					data:obj
				})
				this.setState({
					loading:false
				})
			})
		}
	}
    componentWillReceiveProps(e) {
		if(e.code !== this.state.code){
			this.setState({
				code:e.code
			})
			_superagent
			.post(URL+''+e.code+'/table')
			.set("Content-Type", "application/json")
			.send('{}')
		  	.then(res=>{
				var data = res.body.data;
				var obj = {};
				obj.columns  = JSON.parse(data.columns);
				obj.term_info  = data.term_info;
				obj.report  = data.report;
				obj.branch_level  = data.branch_level;
				obj.branch_level_down  = data.branch_level_down;
				this.setState({
					data:obj
				})
				this.setState({
					loading:false
				})
				
			})
		}
    }
    changePage(){
		this.setState({
			loading:true
		})
		_superagent
			.post(URL+''+this.state.code+'/table')
			.set("Content-Type", "application/json")
			.send(JSON.stringify(this.state.param))
		  	.then(res=>{
				var data = res.body.data;
				var obj = {};
				obj.columns  = JSON.parse(data.columns);
				obj.term_info  = data.term_info;
				obj.report  = data.report;
				obj.branch_level  = data.branch_level;
				obj.branch_level_down  = data.branch_level_down;
				this.setState({
					data:obj
				})
				this.setState({
					loading:false
				})
			})
		}
  	render() {
		var data1 = this.state.data.report;
		if(data1){
			maxNum = 0;
			var x = data1[0] || {};
			for(var k in x){
				maxNum ++
			}
		}
		Num = 0;
		let data = [];
		var newObj = {
			d2:'合计',
			d1:'',
			d3:0,
			d4:0,
			d5:0,
			d6:0,
			d7:0,
			d8:0,
			d9:0,
			d10:0,
			d11:0,
			d12:0,
			d13:0,
			d14:0,
			d15:0,
			d16:0,
		};
		for(var i =0;i<data1.length;i++){
			data[i] = data1[i];
			for(var k in data1[i]){
				if(typeof data1[i][k] === 'number'){
					newObj[k] = newObj[k] + data[i][k]; 
				}
			}
		}
		for(var k in newObj){
			if(typeof newObj[k] === 'number' ){
				newObj[k] = newObj[k].toFixed(3)-0
			}
		}
		if(this.state.data.is_total){
			data.push(newObj)
		}
    return (
      <div style={{padding:'20px',paddingBottom:'0'}} className={Style.report}>
      <Spin spinning={this.state.loading} size="large" tip="加载中...">
		  {this.state.data.term_info && this.state.data.term_info.map((value,index)=>{
			  if(value.type == '4'){
				if(value.optional == '1'){
					return (<div key={index} className={Style.moreline}>
					   <span className='mr10'>{value.title}</span>
						<Select 
					   		defaultValue={value.default+''}
					   		onChange={e=>{
								var obj = this.state.param;
                                obj[value.name] = e;
                                this.setState({
                                    param:obj
                                })
                                this.changePage()
							}}
					   		 style={{ width: 120 }}>
						   <Option value='2017'>{nowYear+'年'}</Option>
						   <Option value='2016'>{lastYear+'年'}</Option>
						</Select>
					  </div>)
				}else if(value.optional == '2'){
					return (
					  <div key={index} className={Style.moreline}>
					   <span className='mr10'>{value.title}</span>
						<MonthPicker placeholder="Select Month"
							onChange={(e,time)=>{
								var obj = this.state.param;
                                obj[value.name] = time;
                                this.setState({
                                    param:obj
                                })
                                this.changePage()
							}}
						  	defaultValue={
								moment(value.default, 'YYYY-MM-DD')
								}/>
					  </div>)
				}else if(value.optional == '3'){
					return (
					  <div key={index} className={Style.moreline}>
					   <span className='mr10'>{value.title}</span>
						<DatePicker  placeholder="Select Month"
							onChange={(e,time)=>{
								var obj = this.state.param;
                                obj[value.name] = time;
                                this.setState({
                                    param:obj
                                })
                                this.changePage()
							}}
						 defaultValue={
						moment(value.default, 'YYYY-MM-DD')
						}/>
					  </div>
					)
				}  
			  }else if(value.type == '2'){
				  return (
					  <div key={index} className={Style.moreline}>
						<span className='mr10'>{value.title}</span>
						<Select
						 defaultValue={value.default} 
						 onChange={e=>{
                            if(e){
                                var obj = this.state.param;
                                obj[value.name] = e;
                                this.setState({
                                    param:obj
                                })
                                this.changePage()
                            }
                        }}
						style={{ width: 120 }}>
							{
							  value.optional.split(' ').map((e,i)=>{
								  return <Option value={e.split('-')[0]} key={i}>{e.split('-')[1]}</Option>
							  })
						  }
						</Select>
					  </div>   
				)
			  }else if(value.type == '3'){
				
				  var newArr = [];
				  if(!value.optional){
					  return null
				  }
				  var arrs =value.optional.split(' ');
				  for(var i= 0;i<arrs.length;i++ ){
					  	var nullStr = arrs[i].split('-')[0];
						newArr.push(nullStr)
				  }
				  return (
					  <div key={index} className={Style.moreline}>
						<span className={Style.mr10}>{value.title}</span>
						<Select
						mode="multiple"
						style={{ width: '70%' }}
						placeholder="Tags Mode"
						defaultValue={newArr}
						onChange={e=>{
                            if(e.length!==0){
                                var obj = this.state.param;
                                obj[value.name] = e.join(',');
                                this.setState({
                                    param:obj
                                })
                                this.changePage()
                            }
                        }}
					  >
							{
							  value.optional.split(' ').map((e,i)=>{
								  return <Option value={e.split('-')[0]} key={i}>{e.split('-')[1]}</Option>
							  })
						  }
						</Select>
					  </div> 
				)
                }else if(value.type == '1'){
                    var obj = this.state.param;
					var arr = JSON.parse(value.default);
					var newArr = [];
					for(var i =0;i<arr.length;i++){
						newArr.push(arr[i] + '');
					}
					flagBranch = value.name;
                    return (
                        <div key={index} className={Style.moreline}>
                        <span className={Style.mr10}>{value.title}</span>
                        <Cascader options={
								this.state.data.branch_level_down === 'P'?Province:City
							} 
                            value = {newArr}
                            placeholder="Please select"
                            style={{width: 240}}
                            onChange={(e,i)=>{
                            if(e.length>0){
								
                                var obj = this.state.param;
                                obj[value.name] = e;
                                this.setState({
                                    param:obj
                                })
								var locationData = [];
								for(var j =0;j<2;j++){
									if(i[0].value !==i[2].value){
										locationData.push({label: i[j].label,value: i[j].value})
									}else {
										locationData=[{label: i[2].label,value: i[2].value}]
									}
								}
								this.setState({
								  location:locationData
								});
                                this.changePage()
                            }
                        }}
                        />
                      </div>)
             }
			})
		  }
		 	<Row>
              <Col span={24} style={{ textAlign: 'right'}}>
                <Button type="primary" icon="reload" loading={this.props.iconLoading} onClick={()=>{
               		 this.changePage()
                  }}>
                  刷新
                </Button>
              </Col>
            </Row>
             <Alert style={{ marginBottom: '16px' }}  message={
            <Breadcrumb>
            {
              this.state.location && this.state.location.map((l,index)=>
                <Breadcrumb.Item key={index} onClick={()=>{
                  const location = [];
                  for(let loc of this.state.location){
                    location.push(loc);
                    if (l.value === loc.value) {
                      break;
                    }
                  }
					this.setState({
					  location
					});
				  	var obj = this.state.param;
					obj[flagBranch] = ["610000",l.value+'',l.value+''];
					this.setState({
						param:obj
					})
					 this.changePage()
				 }
         
                }>
                  <span>{l.label}</span>
                </Breadcrumb.Item>
              )
            }
            </Breadcrumb>

          } />
		 <Table
			dataSource={data}
			pagination={false}
			size="small"
			bordered
			rowKey='d1'
		 	onRowClick={(record, index)=>{
				if(this.state.data.branch_level != this.state.data.branch_level_down && this.state.data.branch_level_down ){
					 this.setState({
						location: [...this.state.location,{label: record.d2,value: record.d1}]
					  });
					 var obj = this.state.param;
					obj[flagBranch] = ["610000",record.d1+'',record.d1+''];
					this.setState({
						param:obj
					})
					this.changePage()
				}
              }}
		 >
			{  
			 this.state.data.columns &&
			this.state.data.columns.map(function(v,index){  
				if(typeof v === 'string'){
					if(index===0){
						return null
					}else {
						return 	(<Column
							  title={v}
							  dataIndex={'d'+(index+1)}
							  key={Math.random()}
							/>)
					}

				}else {
				if(v.children !== undefined){
					return (
						<ColumnGroup title={v.cloumns} key={Math.random()+''}>
						{
						v.children.map(function(value,index){
							Num++
							if(Num==maxNum+1){
								Num = 1;
							}
							return <Column
								  title={value}
								  dataIndex={'d'+Num}
								  key={Math.random()+''}
								/>
						})}
						</ColumnGroup>)
				}else {
					Num++;
					if(Num==maxNum+1){
						Num = 1;
					}
					return 	(<Column
						  title={v.columns}
						  dataIndex={'d'+Num}
						  key={Math.random()}
						/>)

				}
				}
			})
			}

		</Table>
		</Spin>
      </div>
    );
  }
}
export default Home;



