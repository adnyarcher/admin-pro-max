import React, { useState } from 'react';
import {Button, Modal, Select, Space} from 'antd';
import Search from "../Utils/Search";
import {SearchResultForCompany, SearchResultForFindDriver} from "../Utils/SearchResults";
import {userCompany} from "../../API/Dailies/userCompany";

const { Option } = Select;
const AddMultiUserModal = ({ isModalVisible, setIsModalVisible, userId, companyId, userRole }: {isModalVisible: boolean, setIsModalVisible(val: boolean): void, userId: number | string | undefined, companyId: number | undefined, userRole: string | undefined}) => {
    const [driverId, setDriverId] = useState<undefined | number | string>(undefined);
    const [role, setRole] = useState<string | undefined>(userRole);
    const [currentCompanyId, setCurrentCompanyId] = useState<undefined | number>(undefined);
    const handleOk = () => {
        if(currentCompanyId && driverId && role) {
            userCompany.addMultiUser(currentCompanyId, driverId, role);
        }
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const onSelectDriver = (value: any, {valId}: {valId: number | string | undefined}) => {
        setDriverId(valId);
    }
    return (
        <>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okButtonProps={{disabled: !(driverId && currentCompanyId && role)}}>
                <Space direction="vertical" size="middle" style={{display: 'flex'}}>
                    <Select defaultValue={role || 'all'} onChange={(value, option) => {
                        setRole(value === 'all' ? undefined : value)
                    }} style={{ width: '300px' }}>
                        <Option key={'all'}>All Users</Option>
                        <Option key={'super-dispatcher'}>Super Dispatcher</Option>
                        <Option key={'dispatcher'}>Dispatchers</Option>
                        <Option key={'admin'}>Admins</Option>
                    </Select>
                    <Search SearchResult={SearchResultForCompany} onSelect={(value: any, {valId}: {valId: number | undefined}) => {
                        setCurrentCompanyId(valId);
                    }} placeholder={'Company Search'} />
                    <Search SearchResult={(query: string) => SearchResultForFindDriver(query, undefined, role)} onSelect={onSelectDriver} placeholder="User name"/>
                </Space>
            </Modal>
        </>
    );
};

export default AddMultiUserModal;