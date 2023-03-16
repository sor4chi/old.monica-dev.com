-- AlterTable
ALTER TABLE `Blog` MODIFY `content` TEXT NOT NULL;

-- RenameIndex
ALTER TABLE `BlogTag` RENAME INDEX `BlogTag_blogId_fkey` TO `BlogTag_blogId_idx`;

-- RenameIndex
ALTER TABLE `BlogTag` RENAME INDEX `BlogTag_tagId_fkey` TO `BlogTag_tagId_idx`;
