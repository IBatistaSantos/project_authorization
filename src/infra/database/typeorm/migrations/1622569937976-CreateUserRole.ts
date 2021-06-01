import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateUserRole1622569937976 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_role",
        columns: [
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "role_id",
            type: "uuid",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "user_role",
      new TableForeignKey({
        name: "FKUserRole",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["user_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL ",
      })
    );

    await queryRunner.createForeignKey(
      "user_role",
      new TableForeignKey({
        name: "FKRoleUser",
        referencedTableName: "role",
        referencedColumnNames: ["id"],
        columnNames: ["role_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL ",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("user_role", "FKRoleUser");
    await queryRunner.dropForeignKey("user_role", "FKUserRole");
    await queryRunner.dropTable("user_role");
  }
}
