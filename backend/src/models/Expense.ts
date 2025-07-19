import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import Budget from "./Budget";

@Table({
    tableName: "expenses",
    timestamps: true,
})
class Expense extends Model{
    @Column({
        type: DataType.STRING,
    })
    declare name: string;

    @Column({
        type: DataType.DECIMAL,
    })
    declare amount: number;

    @ForeignKey(() => Budget)
    declare budgetId: number;

    @BelongsTo(() => Budget)
    declare budget: Budget;
}