import { Table, Column, Model, DataType, ForeignKey, BelongsTo, AllowNull } from "sequelize-typescript";
import Budget from "./Budget";

@Table({
    tableName: "expenses",
    timestamps: true,
})
export class Expense extends Model{
    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    declare name: string;

    @AllowNull(false)
    @Column({
        type: DataType.DECIMAL,
    })
    declare amount: number;

    @ForeignKey(() => Budget)
    declare budgetId: number;

    @BelongsTo(() => Budget)
    declare budget: Budget;
}