import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from 'axios';

/** calculate the number of attempts */
export function attempts_Number(result) {
    return result.filter(r => r !== undefined).length;
}

/** calculate earned points */
export function earnPoints_Number(result, answers, point) {
    return result
        .map((element, i) => answers[i] === element)
        .filter(i => i)
        .map(i => point)
        .reduce((prev, curr) => prev + curr, 0);
}

/** flag result based on earned points */
export function flagResult(totalPoints, earnPoints) {
    return (totalPoints * 50 / 100) < earnPoints; /** earn 50% marks */
}

/** check user auth */
export function CheckUserExist({ children }) {
    const auth = useSelector(state => state.result.userId);
    const accessToken = localStorage.getItem('accessToken');
    return auth && accessToken ? children : <Navigate to={'/login'} replace={true} />;
}

/** get server data */
export async function getServerData(url, callback) {
    const data = await (await axios.get(url))?.data;
    return callback ? callback(data) : data;
}

/** post server data */
export async function postServerData(url, result, callback) {
    const data = await (await axios.post(url, result))?.data;
    return callback ? callback(data) : data;
}
