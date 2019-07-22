CREATE TABLE IF NOT EXISTS `tasks` (
	`id` VARCHAR(255),
	`kind` VARCHAR(255),
	`selfLink` VARCHAR(255),
	`title` VARCHAR(255),
	`completed` VARCHAR(50),
	`due` VARCHAR(50),
	`etag` VARCHAR(50),
	`hidden` BOOLEAN,
	`position` BIGINT,
	`status` VARCHAR(50),
	`updated` VARCHAR(50)
);

CREATE UNIQUE INDEX IF NOT EXISTS tasks_id_primary on tasks(`id`);