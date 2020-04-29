/*
 Navicat Premium Data Transfer

 Source Server         : complete
 Source Server Type    : MySQL
 Source Server Version : 80018
 Source Host           : localhost:3306
 Source Schema         : complete

 Target Server Type    : MySQL
 Target Server Version : 80018
 File Encoding         : 65001

 Date: 14/04/2020 19:35:19
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for group
-- ----------------------------
DROP TABLE IF EXISTS `group`;
CREATE TABLE `group`  (
  `group_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `group_leaderId` int(11) NOT NULL,
  `group_adminId` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `group_menberId` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `group_task` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `group_leaderName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `group_taskName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `group_menberName` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  PRIMARY KEY (`group_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of group
-- ----------------------------
INSERT INTO `group` VALUES (1, '微商群', 1, '4', '1,4,5', '1,10,11,21,12,14', 'redipy', '完成翠湖湾企划,洗漱睡觉,打代码,w,321,222', 'redipy,hamster,hana');
INSERT INTO `group` VALUES (4, '喜马拉雅听书群', 3, '', '4', '1,11', 'user', '完成翠湖湾企划,打代码', 'hamster');
INSERT INTO `group` VALUES (5, '淘宝羊毛群', 5, '4', '4,5', NULL, 'hana', NULL, 'hamster,hana');
INSERT INTO `group` VALUES (6, '海外代购群', 5, '4', '4,5', NULL, 'hana', NULL, 'hamster,hana');
INSERT INTO `group` VALUES (7, '夸夸群', 4, '5', '1,3,4,5', NULL, 'hamster', NULL, 'redipy,user,hamster,hana');
INSERT INTO `group` VALUES (8, '网课群', 1, '3,4', '1,4,5', '1,28,30', 'redipy', '完成翠湖湾企划,32,asdasd', 'redipy,hamster,hana');
INSERT INTO `group` VALUES (9, '外卖红包群', 1, '3,4', '1,4,5', NULL, 'redipy', NULL, 'redipy,hamster,hana');
INSERT INTO `group` VALUES (10, '16007班班群', 1, '3,4', '1,4,5', NULL, 'redipy', NULL, 'redipy,hamster,hana');

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`  (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `message_info` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `message_from` int(11) NOT NULL,
  `message_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `message_userid` int(11) NOT NULL,
  `message_type` tinyint(1) NOT NULL COMMENT '1是邀请，0是退出和创建',
  `message_groupid` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`message_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for noforget
-- ----------------------------
DROP TABLE IF EXISTS `noforget`;
CREATE TABLE `noforget`  (
  `noforget_id` int(10) NOT NULL AUTO_INCREMENT,
  `noforget_info` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `noforget_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `noforget_userid` int(10) NOT NULL,
  PRIMARY KEY (`noforget_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of noforget
-- ----------------------------
INSERT INTO `noforget` VALUES (11, '<ul><li>w</li><li>swww</li><li>dwww</li><li>a</li></ul>', '2020-03-21', 1);
INSERT INTO `noforget` VALUES (12, '<ul><li>w</li><li>s</li><li>d</li><li>a</li></ul><p>ssssssss</p>', '2020-03-21', 1);
INSERT INTO `noforget` VALUES (13, '<ul><li>w</li><li>s</li><li>d</li><li>a</li></ul><p>asdasdasdasd</p>', '2020-03-21', 1);
INSERT INTO `noforget` VALUES (14, '<p>wwww</p>', '2020-03-19', 1);
INSERT INTO `noforget` VALUES (15, '<ul><li>吃饭</li></ul>', '2020-03-21', 18);
INSERT INTO `noforget` VALUES (16, '', '2020-04-13', 1);
INSERT INTO `noforget` VALUES (17, '<p>www</p>', '2020-04-07', 1);

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
  `task_step` tinyint(1) NULL DEFAULT NULL COMMENT '是否拥有多个步骤',
  `task_startdate` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '任务开始日期',
  `task_enddate` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '任务结束时间',
  `task_userid` int(10) NOT NULL COMMENT '任务所属用户id',
  `task_type` int(10) NOT NULL COMMENT '任务类型',
  PRIMARY KEY (`task_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of task
-- ----------------------------
INSERT INTO `task` VALUES (1, '起床', '8:00', '8:15', '早睡早起!', NULL, 0, NULL, NULL, 0, 0);
INSERT INTO `task` VALUES (2, '吃早饭', '8:20', '8:40', '为了健康！', NULL, 0, NULL, NULL, 0, 0);
INSERT INTO `task` VALUES (3, '学习', '8:50', '11:50', '好好学习天天向上', NULL, 0, NULL, NULL, 0, 0);
INSERT INTO `task` VALUES (4, '吃午饭', '12:00', '13:00', '午饭一定要好好吃哦', NULL, 0, NULL, NULL, 0, 0);
INSERT INTO `task` VALUES (5, '睡午觉', '13:00', '14:00', '好好睡午觉，下午才有精力哦！', NULL, 0, NULL, NULL, 0, 0);
INSERT INTO `task` VALUES (6, '学习', '14:30', '16:00', '下午也要好好学习', NULL, 0, NULL, NULL, 0, 0);
INSERT INTO `task` VALUES (7, '做晚饭', '16:30', '17:00', '晚上犒劳犒劳自己', NULL, 0, NULL, NULL, 0, 0);
INSERT INTO `task` VALUES (8, '出门逛街', '18:00', '20:00', '出门活动活动总没坏处', NULL, 0, NULL, NULL, 0, 0);
INSERT INTO `task` VALUES (9, '回家看电视', '20:30', '22:00', '追剧是人生追求', NULL, 0, NULL, NULL, 0, 0);
INSERT INTO `task` VALUES (10, '洗漱睡觉', '22:30', NULL, '早睡早起!', NULL, 0, NULL, NULL, 0, 0);
INSERT INTO `task` VALUES (11, '123', NULL, NULL, '321', NULL, NULL, NULL, NULL, 1, 0);
INSERT INTO `task` VALUES (12, '321', NULL, NULL, '123', NULL, NULL, NULL, NULL, 1, 1);
INSERT INTO `task` VALUES (13, '111', NULL, NULL, '222', NULL, NULL, '2020-04-08', '2020-04-17', 1, 0);
INSERT INTO `task` VALUES (14, '222', NULL, NULL, '111', NULL, NULL, '2020-04-03', '2020-04-18', 1, 1);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '用户名',
  `user_password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '用户密码',
  `user_img` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '用户头像',
  `user_task` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '用户任务',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'redipy', '107623', NULL, NULL);
INSERT INTO `user` VALUES (3, 'user', '123456', NULL, NULL);
INSERT INTO `user` VALUES (4, 'hamster', '123456', NULL, NULL);
INSERT INTO `user` VALUES (5, 'hana', '123456', NULL, NULL);
INSERT INTO `user` VALUES (6, '123', '123456', NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
