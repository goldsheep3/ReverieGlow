const UPDATE_HISTORY = [
  { version: "b1.0", desc: "整合包基础打包完成" },
  { version: "b1.0.1", desc: "[命令]/ktp用于无权限传送，但跨维度传送会忽略维度信息" },
  { version: "b1.0.2", desc: "[配方]匠魂黏液水晶块粉碎轮破碎" },
  { version: "b1.1", desc: "[模组]时装盔甲（重置版）" },
  { version: "b1.1.1", desc: "[配方]海晶沙粒→末影珍珠粒的龙息鼓风机修改回末影珍珠" },
  { version: "b1.1.2", desc: "[命令]/ktp命令的跨维度传送增加了无法传送提醒" },
  { version: "b1.1.3", desc: "[配方]（二重）压缩加速火把的无配方提示配方" },
  { version: "b1.2", desc: "[模组]全域点歌" },
  { version: "b1.2.1", desc: "[物品]染料可食用" },
  { version: "b1.2.2", desc: "[物品]染料食用效果修改" },
  { version: "b1.3", desc: "[模组]玉米乐事；需要探索新地图以获取新作物" },
  { version: "b1.3.1", desc: "[配方]矿石开掘的植物魔法/神话植物学挖掘配方修改至阿尔夫海姆维度" },
  { version: "b1.3.2", desc: "[命令]增加了查询更新历史的/kiane_history" },
  { version: "b1.3.3", desc: "[事件]修复了登入提醒版本的事件" },
  { version: "b1.3.4", desc: "[事件/命令]优化了登入提醒版本事件和查询更新历史命令的格式化文本" },
  { version: "b1.3.5", desc: "[配方]b1.3.1的应用失败被修改，目前矿石开掘不生成对应矿物" },
  { version: "b1.3.6", desc: "[配方]各种原版材料刀具的「冶炼」配方" },
  { version: "b1.4", desc: "[物品]对时间之瓶相关合成增加了中间件【时间核心】" },
  { version: "b1.5", desc: "[模组]更新了部分模组版本, 移除了部分未更新扩展模组, 移除了部分存在率低的模组, 添加了【女仆实用任务】等实用模组, 增改了【时间核心】相关物品及配方" },
  { version: "b1.6", desc: "[模组]替换了模组【更多箱子】为【扩展存储】；修复了命令有效性；将b1.5未更新扩展模组重新加回" },
  { version: "b1.6.1", desc: "[配方]修复了矿石开掘模组的配方问题，目前修复了除氟石/硝石/硫磺以外的所有b1.3添加的矿石" },
  { version: "b1.7", desc: "[模组/配方]调整部分模组；修复了合成二重压缩加速火把需要四颗龙蛋的问题，现在只需要一颗" },
  { version: "b1.7.1", desc: "[配方]将裂岩弹相关调整至mek/create支持的粉碎" },
  { version: "b1.8", desc: "[模组]热力补充了管道和集成模组，清除部分错误模组，更新部分模组，默认禁用时装工坊（存在ysm）" },
  { version: "b1.9", desc: "[模组]调整了部分模组，修改了KubeJS相关结构，设置了部分模组配置文件，整理了部分游戏文件，撤销了热力管道模组，屏蔽了热力三种烈焰人变种生成" },
  { version: "b2.0", desc: "[整理]包英文名更名为§6ReverieGlow§a，开发代号为§6Reglow" },
  { version: "b2.0.1", desc: "[整理]重构了server_scripts的结构，优化了代码架构" },
  { version: "b2.1", desc: "[模组]对矿石开掘添加了三种原石（粗矿）的块状物品，但未完成对应处理配方；删除了咖啡乐事模组及相关脚本"},

  // todo
  // { version: "", desc: "矿石开掘块的处理方式" },
  // { version: "", desc: "矿石开掘整体迁移，处理原版合并和模组mek优先替换" },
  // { version: "", desc: "模拟殖民地所有植物打标签，任务提供交换方案" }
  // { version: "", desc: "特殊村民汉化、补充汉化" },
  // { version: "", desc: "神话植物学-源质钢剑指南文本汉化修改" },
  // { version: "", desc: "机械动力：筛子的配方平衡和额外废产物" },
  // { version: "", desc: "机械动力粉碎矿石的匠魂可熔炼性" },
  // { version: "", desc: "锦致装饰末影人头颅的匠魂可熔炼性" },
  // { version: "", desc: "夸克金栏杆的匠魂可熔炼性" },
  // { version: "", desc: "各种刀具的匠魂可熔炼性" },
];

const QQ_GROUP = "972459989";
const newestVersion = UPDATE_HISTORY[UPDATE_HISTORY.length - 1].version;

function isMajorVersion(version) {
  return /^b\d+\.\d+$/.test(version);
}

function sendUpdateLog(player, updates, options) {
  options = options || {};
  var prefix = options.prefix || "§b-";
  var maxCount = options.maxCount || null;
  var reverse = options.reverse || false;
  var autoStage = options.autoStage || false;
  var majorOnly = options.majorOnly || false;
  
  var list = majorOnly ? updates.filter(function(item) { return isMajorVersion(item.version); }) : updates;
  if (reverse) list = list.slice().reverse();
  if (maxCount && list.length > maxCount) list = list.slice(0, maxCount);
  list.forEach(function(item) {
    player.tell(prefix + " §9" + item.version + "§b: §a" + item.desc);
    if (autoStage && !player.stages.has(item.version)) {
      player.stages.add(item.version);
    }
  });
}

function tellVersionAndQQ(player) {
  player.tell("§b当前版本为 §9" + newestVersion + " §b。遇到问题或建议可加QQ群: §e" + QQ_GROUP)
    .clickCopy(QQ_GROUP)
    .hover("§b点击复制群号: §e" + QQ_GROUP)
}

PlayerEvents.loggedIn(function(event) {
  if (!UPDATE_HISTORY.length) return;

  var player = event.player;

  // 如果玩家已拥有最新版本阶段，则不弹出提示
  if (player.stages.has(newestVersion)) return;

  player.tell("§3================= [kiane] =================");
  player.tell("§b感谢游玩 §6GoldSheep3 §b制作的休闲整合 §9朝暮拾光 §b！");
  tellVersionAndQQ(player);

  if (!player.stages.has('kiane_beforetomorrow_joined')) {
    player.stages.add('kiane_beforetomorrow_joined');
    UPDATE_HISTORY.forEach(function(v) { player.stages.add(v.version); });
    player.tell("§b祝你游玩愉快！");
  } else {
    var updatesToShow = UPDATE_HISTORY.filter(function(item) { return !player.stages.has(item.version); });
    var maxCount = 3;
    player.tell("§b更新内容:");
    sendUpdateLog(player, updatesToShow, {
      reverse: true,
      maxCount: maxCount,
      autoStage: true,
      majorOnly: false
    });
    var moreCount = updatesToShow.length - maxCount;
    if (moreCount > 0) {
      player.tell("§b……§e" + moreCount + "§b个更多版本更新日志。使用§a/kiane_history§b查看主版本更新日志，或加入QQ群§e" + QQ_GROUP + "§b获取更多信息。");
    }
  }
  player.tell("§3==========================================");
});

ServerEvents.commandRegistry(function(event) {
  var Commands = event.commands;
  event.register(
    Commands.literal("kiane_history")
      .executes(function(ctx) {
        var player = ctx && ctx.source && ctx.source.player;
        if (!player) {
          ctx.source.sendFailure("仅玩家可执行此命令");
          return 0;
        }
        player.tell("§3=========== [kiane] §b整合主版本更新日志 §3===========");
        tellVersionAndQQ(player);
        sendUpdateLog(player, UPDATE_HISTORY, { prefix: "§b>>", majorOnly: true });
        player.tell("§3==========================================");
        return 1;
      })
  );
});