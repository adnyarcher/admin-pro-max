import React, {useCallback, useEffect, useState} from 'react';
// import {dailies} from "../../API/Dailies/daily";
import {useDailiesData} from "../../Hooks/Dailies";
import DaliesListTable from "./DaliesListTable";
import moment from "moment";
type Data = {
    data?: {
        data: Array<any>,
        count: number
    }
}
const Dailies: React.FC = React.memo(() => {
    const [todayDate, setTodayDate] = useState<string | undefined>(moment.utc(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD').add(11, 'hour').toISOString());
    const [dailiesData, setDailiesData] = useState<Array<any>>([]);
    const [filter, setFilter] = useState<{where: object, order: any, limit: number, skip: number}>({
        "where":{date: todayDate},
        "order":["id DESC"],
        "limit":10,
        "skip":0
        }
    );
    const [countFilter, setCountFilter] = useState<any>({})
    const [total, setTotal] = useState<number>(1);
    const { data }: Data = useDailiesData({date: todayDate, filter, countFilter})
    useEffect(() => {
        if(data) {
            setDailiesData(data.data)
            if(filter.skip === 0) {
                setTotal(data.count)
            }
        }
    }, [data]);
    const changeCurrentSkip = useCallback((current: number) => {
        setFilter(value => {
            return {
                ...value,
                skip: current * 10
            }
        })
    }, [])
    const findDailiesByCompany = useCallback((id: number | undefined) => {
        if(!id) {
            setFilter(value => {
                return {
                    ...value,
                    where: {
                        ...value.where,
                        companyId: undefined
                    }
                }
            })
            setCountFilter({})
            return
        }
        setFilter(value => {
            return {
                ...value,
                where: id ? {...value.where, companyId: id, driverId: undefined} : {}
            }
        })
        setCountFilter({...countFilter, companyId: id})
        }, [countFilter],
    );
    const findDailiesByDriver = useCallback((driverId: number | string | undefined) => {
        if(!driverId) {
            setFilter(value => {
                return {
                    ...value,
                    where: {
                        ...value.where,
                        driverId: undefined
                    }
                }
            })
            setCountFilter({})
            return
        }
        setFilter(value => {
            return {
                ...value,
                where: driverId ? {...value.where, driverId, companyId: undefined} : {}
            }
        })
        setCountFilter({...countFilter, driverId})
    }, [countFilter])
    const changeDate = useCallback(
        (date: string) => {
            setTodayDate(date)
        },
        [],
    );

    return (
        <div>
            <h1>Dailies</h1>
            <DaliesListTable dailiesData={dailiesData} total={total} changeCurrentSkip={changeCurrentSkip} loading={!data} findDailiesByCompany={findDailiesByCompany} findDailiesByDriver={findDailiesByDriver} changeDate={changeDate} />
        </div>
    );
});

export default Dailies;
