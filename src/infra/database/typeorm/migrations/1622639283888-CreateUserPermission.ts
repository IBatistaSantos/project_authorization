import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateUserPermission1622639283888 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_permission",
        columns: [
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "permission_id",
            type: "uuid",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "user_permission",
      new TableForeignKey({
        name: "FKUserPermission",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["user_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL ",
      })
    );

    await queryRunner.createForeignKey(
      "user_permission",
      new TableForeignKey({
        name: "FKPermissionUser",
        referencedTableName: "permission",
        referencedColumnNames: ["id"],
        columnNames: ["permission_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL ",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("user_role", "FKPermissionUser");
    await queryRunner.dropForeignKey("user_role", "FKUserPermission");
    await queryRunner.dropTable("user_permission");
  }
}
