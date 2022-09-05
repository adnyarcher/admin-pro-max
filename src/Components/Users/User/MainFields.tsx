import React, {useState} from 'react';
import {Col, Input, Row, Select, Space, Spin, Switch} from "antd";
import {Field} from "react-final-form";
import Search from "../../Utils/Search";
import {SearchResultForCompany, SearchResultForVehicle} from "../../Utils/SearchResults";
import {useCompanyData, useVehicleData} from "../../../Hooks/Companies";
import {usStates} from "../../Utils/data";

const { Option } = Select;
const MainFields = ({ data }: { data: any }) => {
    const [check, setCheck] = useState(false);
    const myComp = useCompanyData(data.companyId);
    const myVehicle = useVehicleData(data.vehicleId);
    console.log(data)
    return !myComp.isLoading && !myVehicle.isLoading ? (
        <div>
            <Space direction="vertical" size="middle" style={{display: 'flex'}}>
                {/*<Row>*/}
                {/*    <Col span={8}>*/}

                {/*    </Col>*/}
                {/*    <Col span={8}>*/}

                {/*    </Col>*/}
                {/*    <Col span={8}>*/}

                {/*    </Col>*/}
                {/*</Row>*/}
                <Row gutter={16}>
                    <Col span={8}>
                        <div>
                            <label>Id: </label>
                            <Field
                                name="id"
                                render={({input}: { input: any }) => (
                                    <Input disabled type="text" {...input} />
                                )}
                            />
                        </div>
                    </Col>
                    <Col span={8}>
                        <div>
                            <label>Company:</label><br/>
                            <Field
                                name="companyId"
                                render={({input}: { input: any }) => (
                                    <>
                                        {check ? <Search SearchResult={SearchResultForCompany} onSelect={(value: any, {valId}: {valId: number | undefined}) => {
                                                input.onChange(valId)
                                            }} placeholder={"Companies"} defaultValue={myComp.data.name} /> :
                                            <div onClick={() => data.role === 'dispatcher' && setCheck(true)}><h1 style={{margin: 0}}>{myComp.data.name}</h1></div>
                                        }
                                    </>
                                )}
                            />
                        </div>
                    </Col>
                    <Col span={8}>
                        <div>
                            <label>Role:</label><br/>
                            <Field
                                name="role"
                                render={({input}: { input: any }) => (
                                    <h1 style={{textTransform: 'uppercase'}}>{input.value}</h1>
                                )}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <div>
                            <label>Is Active: </label>
                            <Field
                                name="is_active"
                                render={({input}: { input: any }) => (
                                    <Switch defaultChecked={input.value} onChange={input.onChange}/>
                                )}
                            />
                        </div>
                    </Col>
                    {data.role !== 'driver' && <Col span={6}>
                        <div>
                            <label>Is Owner: </label>
                            <Field
                                name="isOwner"
                                render={({input}: { input: any }) => (
                                    <Switch defaultChecked={input.value} onChange={input.onChange}/>
                                )}
                            />
                        </div>
                    </Col>}
                    {data.role !== 'driver' && <Col span={6}>
                        <div>
                            <label>Is Support: </label>
                            <Field
                                name="isSupport"
                                render={({input}: { input: any }) => (
                                    <Switch defaultChecked={input.value} onChange={input.onChange}/>
                                )}
                            />
                        </div>
                    </Col>}
                    <Col span={6}>
                        <div>
                            <label>Email Verified: </label>
                            <Field
                                name="emailVerified"
                                render={({input}: { input: any }) => (
                                    <Switch defaultChecked={input.value} onChange={input.onChange}/>
                                )}
                            />
                        </div>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <div>
                            <label>First Name: </label>
                            <Field
                                name="first_name"
                                render={({input}: { input: any }) => (
                                    <Input placeholder="First Name" type="text" {...input} />
                                )}
                            />
                        </div>
                    </Col>
                    <Col span={8}>
                        <div>
                            <label>Second Name: </label>
                            <Field
                                name="second_name"
                                render={({input}: { input: any }) => (
                                    <Input placeholder="Second Name" type="text" {...input} />
                                )}
                            />
                        </div>
                    </Col>
                    <Col span={8}>
                        <div>
                            <label>Username: </label>
                            <Field
                                name="username"
                                render={({input}: { input: any }) => (
                                    <Input placeholder="Second Name" type="text" {...input} />
                                )}
                            />
                        </div>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <div>
                            <label>Email: </label>
                            <Field
                                name="email"
                                render={({input}: { input: any }) => (
                                    <Input placeholder="Second Name" type="text" {...input} />
                                )}
                            />
                        </div>
                    </Col>
                    <Col span={8}>
                        <div>
                            <label>Phone: </label>
                            <Field
                                name="phone"
                                render={({input}: { input: any }) => (
                                    <Input placeholder="Second Name" type="text" {...input} />
                                )}
                            />
                        </div>
                    </Col>
                    <Col span={8}>
                        <div>
                            <label>Address: </label>
                            <Field
                                name="address"
                                render={({input}: { input: any }) => (
                                    <Input placeholder="Second Name" type="text" {...input} />
                                )}
                            />
                        </div>
                    </Col>
                </Row>

                {/*<div>*/}
                {/*    <label>Driver: </label>*/}
                {/*    <Field*/}
                {/*        name="driverId"*/}
                {/*        render={({input}: { input: any }) => (*/}
                {/*            <Input placeholder="Second Name" type="text" {...input} />*/}
                {/*        )}*/}
                {/*    />*/}
                {/*</div>*/}

                <div>
                    <label>Vehicle: </label>
                    <Field
                        name="driverId"
                        render={({input}: { input: any }) => (
                            <Search SearchResult={(query: any) => SearchResultForVehicle(query, myComp.data.id)} onSelect={(value: any, {valId}: {valId: number | undefined}) => {
                                input.onChange(valId)
                            }} placeholder={"Companies"} defaultValue={myVehicle?.data?.truck_number || ''} />
                        )}
                    />
                </div>
                <div>
                    <label>Notes: </label>
                    <Field
                        name="notes"
                        render={({input}: { input: any }) => (
                            <Input placeholder="Second Name" type="text" {...input} />
                        )}
                    />
                </div>
                <div>
                    <label>License Number: </label>
                    <Field
                        name="license_number"
                        render={({input}: { input: any }) => (
                            <Input placeholder="Second Name" type="text" {...input} />
                        )}
                    />
                </div>
                <div>
                    <label>License State:</label><br/>
                    <Field
                        name="license_state"
                        render={({input}: { input: any }) => (
                            <Select defaultValue={input.value} onChange={(value, option) => {
                                input.onChange(value)
                            }} style={{width: '100%'}}>
                                {usStates.map(u => <Option key={u.id}>{u.name}</Option>)}
                            </Select>
                        )}
                    />
                </div>
            </Space>
        </div>
    ) : <Spin size="large" spinning={!myComp.data}></Spin>
};

export default MainFields;