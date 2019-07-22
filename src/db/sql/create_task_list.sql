CREATE TABLE `task_lists` (
	`id` VARCHAR(255),
	`kind` VARCHAR(255),
	`selfLink` VARCHAR(255),
	`title` VARCHAR(255),
	`updated` VARCHAR(50)
);

CREATE UNIQUE INDEX task_lists_id_primary on task_lists(`id`);