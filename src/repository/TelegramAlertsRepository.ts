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
            const res = await connection.query("select * from usrsms.telegram_notifications_d();")
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

    public async updateAlertEight(sendingId:number): Promise<void> {
        const connection = await pool.connect();
        try {
            await connection.query("insert into usrsms.tmp_ignore_notifications (campaign_id) values($1)", [sendingId])
        } catch (error) {
            console.log("error")
        } finally {
            connection.release()
        }
    }

    public async updateAlertNoNumber(sendingId:number): Promise<void> {
        const connection = await pool.connect();
        try {
            await connection.query("insert into usrsms.tmp_ignore_notifications_v2 (campaign_id) values($1)", [sendingId])
        } catch (error) {
            console.log("error")
        } finally {
            connection.release()
        }
    }

}

export default TelegramAlertsRepository