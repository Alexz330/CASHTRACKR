import {Table, Column,Model, DataType, HasMany, BelongsTo, ForeignKey} from "sequelize-typescript";

@Table({
    tableName: "budget",
})
class Budget extends Model<Budget>{
  @Column({
    type: DataType.STRING(100),
  })
  name: string;

  @Column({
    type: DataType.DECIMAL,
  })
  amount: number;
}
    

export default Budget;