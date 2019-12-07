/*
 Navicat Premium Data Transfer

 Source Server         : complete
 Source Server Type    : MySQL
 Source Server Version : 80016
 Source Host           : localhost:3306
 Source Schema         : complete

 Target Server Type    : MySQL
 Target Server Version : 80016
 File Encoding         : 65001

 Date: 07/12/2019 21:22:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for task
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task`  (
  `task_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '任务id',
  `task_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '任务名',
  `task_starttime` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '任务开始时间（几点）',
  `task_endtime` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '任务结束时间（几点）',
  `task_detail` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '任务详情',
  `task_file` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '任务文件',
  `task_step` tinyint(1) NOT NULL COMMENT '是否拥有多个步骤',
  `task_startdate` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '任务开始日期',
  `task_enddate` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '任务结束时间',
  PRIMARY KEY (`task_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of task
-- ----------------------------
INSERT INTO `task` VALUES (1, '起床', '8:00', '8:15', '早睡早起!', NULL, 0, NULL, NULL);
INSERT INTO `task` VALUES (2, '吃早饭', '8:20', '8:40', '为了健康！', NULL, 0, NULL, NULL);
INSERT INTO `task` VALUES (3, '学习', '8:50', '11:50', '好好学习天天向上', NULL, 0, NULL, NULL);
INSERT INTO `task` VALUES (4, '吃午饭', '12:00', '13:00', '午饭一定要好好吃哦', NULL, 0, NULL, NULL);
INSERT INTO `task` VALUES (5, '睡午觉', '13:00', '14:00', '好好睡午觉，下午才有精力哦！', NULL, 0, NULL, NULL);
INSERT INTO `task` VALUES (6, '学习', '14:30', '16:00', '下午也要好好学习', NULL, 0, NULL, NULL);
INSERT INTO `task` VALUES (7, '做晚饭', '16:30', '17:00', '晚上犒劳犒劳自己', NULL, 0, NULL, NULL);
INSERT INTO `task` VALUES (8, '出门逛街', '18:00', '20:00', '出门活动活动总没坏处', NULL, 0, NULL, NULL);
INSERT INTO `task` VALUES (9, '回家看电视', '20:30', '22:00', '追剧是人生追求', NULL, 0, NULL, NULL);
INSERT INTO `task` VALUES (10, '洗漱睡觉', '22:30', NULL, '早睡早起!', NULL, 0, NULL, NULL);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '用户名',
  `user_password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '用户密码',
  `user_img` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '用户头像',
  `user_task` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '用户任务',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'redipy', '107623', NULL, NULL);
INSERT INTO `user` VALUES (3, 'user', '123456', NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
