import TelegramAlert from "../entities/TelegramAlert";
import pool from "../database/database";

interface ITelegramAlert {
    p_id_tmp: number,
    p_chat_id: string,
    p_description: string,
    p_message: string

}

class TelegramAlertsRepository {

    public async getTelegramAlerts(): Promise<Array<TelegramAlert>> {
        const alerts: Array<TelegramAlert> = [];
        const connection = await pool.connect();
        try {
            const res = await connection.query("select * from usrsms.telegram_notifications();")
            if (res.rowCount > 0) {
                res.rows.forEach(({p_chat_id, p_description, p_id_tmp, p_message}:ITelegramAlert)=> {
                    const newAlert = new TelegramAlert(p_id_tmp, p_chat_id, p_description, p_message)
                    alerts.push(newAlert)
                });
            }
        } catch (error) {
            console.log("error")
        } finally {
            connection.release()
        }

        return alerts;
    }


}

export default TelegramAlertsRepository