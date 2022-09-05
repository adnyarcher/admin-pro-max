import React from 'react';
import {certifyStatus, configNumberInputs, configs, coordinatesSource} from "../../Utils/data";
import {Input, Select, Space, Switch} from "antd";
import {Field} from "react-final-form";
import {useUserData} from "../../../Hooks/Users";
import {useParams} from "react-router-dom";

const { Option } = Select;
const Config = () => {
    const { id } = useParams<{readonly id: any}>();
    const { data } = useUserData(id);
    return (
        <div>
            <Space direction="vertical" size="middle" style={{display: 'flex', width: '50%'}}>
                {configs.map(config => {
                    return data.role !== config.case && <div>
                        <Field
                            name={`config.${config}`}
                            render={({input}: { input: any }) => (
                                <Switch defaultChecked={input.value} onChange={input.onChange}/>
                            )}
                        />
                        <label style={{marginLeft: '15px'}}>{config.label}</label>
                    </div>
                })}
                <div>
                    <label>certify_status</label>
                    <Field
                        name="config.certify_status"
                        render={({input}: { input: any }) => (
                            <Select defaultValue={input.value} onChange={(value, option) => {
                                input.onChange(value)
                            }} style={{width: '100%'}}>
                                {certifyStatus.map(data => <Option key={data.id}>{data.name}</Option>)}
                            </Select>
                        )}
                    />
                </div>
                <div>
                    <label>coordinates_source</label>
                    <Field
                        name="config.coordinates_source"
                        render={({input}: { input: any }) => (
                            <Select defaultValue={input.value} onChange={(value, option) => {
                                input.onChange(value)
                            }} style={{width: '100%'}}>
                                {coordinatesSource.map(data => <Option key={data.id}>{data.name}</Option>)}
                            </Select>
                        )}
                    />
                </div>
                <div>
                    <label>tracking_source</label>
                    <Field
                        name="config.tracking_source"
                        render={({input}: { input: any }) => (
                            <Select defaultValue={input.value} onChange={(value, option) => {
                                input.onChange(value)
                            }} style={{width: '100%'}}>
                                {coordinatesSource.map(data => <Option key={data.id}>{data.name}</Option>)}
                            </Select>
                        )}
                    />
                </div>
                {configNumberInputs.map(u => {
                    return <div>
                        <label>{u}: </label>
                        <Field
                            name={u}
                            render={({input}: { input: any }) => (
                                <Input placeholder={u} type="number" {...input} />
                            )}
                        />
                    </div>
                })}
            </Space>
        </div>
    )
};

export default Config;