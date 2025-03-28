import { useEffect, useState } from "react";
import { MedalData } from "../../config/type";
import { SortType } from "../../config/constant";
import { fetchMedalData } from "@/services/fetchData";
import { useSort } from "@/hooks/useSort";
import { useSearchParams } from "next/navigation";
import styles from "@/styles/MedalTable.module.css";
import { assignFlagIndex, setTotal } from "@/utils/updateMedalData";

const MedalTable = () => {

    const [medalData, setMedalData] = useState<MedalData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortParameter, setSortParameter] = useState<SortType>(SortType.GOLD);
    const [imageDimensions, setFlagDimensions] = useState<{width: number, height: number}>({width: 0, height: 0});
    const sortMedalData = useSort(medalData, sortParameter);
    
    const searchParams = useSearchParams()
    const sortValue = searchParams.get('sort')

    // fetch Medal Data from API during intial render or page reload. 
    useEffect(() => {
        fetchMedalData().then((data: MedalData[]) => {
            const totalAppendedData = setTotal(data); // Append total to the data.
            const flagIndexedData = assignFlagIndex(totalAppendedData) // Assign flag index to the data.
            setMedalData(sortMedalData(flagIndexedData, sortParameter));
            setLoading(false);
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
        })
    }, []);

    // Set sort parameter based on the query parameter
    useEffect(() => {
        if (sortValue) {
            setSortParameter(sortValue as SortType);
        } else {
            setSortParameter(SortType.GOLD);
        }
    }, [sortValue]);

    // Sort the medal data based on the sort parameter
    useEffect(() => {
        if (sortParameter && medalData?.length) {
            const sortedData = sortMedalData(medalData, sortParameter)
            setMedalData(sortedData);
        }
    }, [sortParameter])

    // Get the dimensions of the image to dynamically render flags based on the flag index.
    useEffect(() => {
        if (medalData.length === 0) return;
        const img = new Image();
        img.src = "/flags.png";
        img.onload = () => {
            setFlagDimensions({width: img.width, height: img.height});
        }
    }, [medalData]);

    // Get the position of the flag based on the flag index.
    const getFlagPositon = (flagIndex: number) => {
        const { height } = imageDimensions;
        const flagHeight = height / medalData.length;
        const x = 0;
        const y = ( flagHeight * flagIndex) - flagHeight;
        return `${x}px -${y}px`;
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    const handleSort = (sortType: SortType) => {
        setSortParameter(sortType);
    }
    return (
        <table className={`${styles.table} ${styles['medal-button-variables']}`}>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th>
                        <button onClick={() => handleSort(SortType.GOLD)} className={`${styles['medal-button']} ${styles['gold-button']}`}></button>
                    </th>
                    <th>
                        <button onClick={() => handleSort(SortType.SILVER)} className={`${styles['medal-button']} ${styles['silver-button']}`}></button>
                    </th>
                    <th>
                        <button onClick={() => handleSort(SortType.BRONZE)} className={`${styles['medal-button']} ${styles['bronze-button']}`}></button>
                    </th>
                    <th>
                        <button onClick={() => handleSort(SortType.TOTAL)} className={` ${styles['medal-button']} ${styles['total-button']}`}>Total</button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {medalData.map((data, index) => (
                    <tr key={index}>
                        <td> 
                            <span>{index + 1}</span>
                        </td>
                        <td>
                            <div
                                className={styles.flag}
                                style={{
                                    width: imageDimensions.width,
                                    height: (imageDimensions.height / medalData.length),
                                    backgroundPosition: getFlagPositon(data.flagIndex ? data.flagIndex : 0),
                                }}></div>
                            <span>{data.code}</span>
                        </td>
                        <td> <span>{data.gold}</span></td>
                        <td> <span>{data.silver}</span></td>
                        <td> <span>{data.bronze}</span></td>
                        <td> <span>{data.total}</span></td>
                    </tr>
                ))}
            </tbody>
        </table>
  );
};

export default MedalTable;