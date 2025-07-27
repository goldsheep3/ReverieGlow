const UPDATE_HISTORY = [
  { version: "0.3.0b", desc: "更新了部分模组，修复了AE2无法拼音搜索的问题" },

  // todo
  // { version: "", desc: "模组整体更新" }
  // { version: "", desc: "矿石开掘块的处理方式" },
  // { version: "", desc: "模拟殖民地所有植物打标签，任务提供交换方案" },
  // { version: "", desc: "特殊村民汉化、补充汉化" },
  // { version: "", desc: "神话植物学-源质钢剑指南文本汉化修改" },
  // { version: "", desc: "机械动力：筛子的配方平衡和额外废产物" },
  // { version: "", desc: "机械动力粉碎矿石的匠魂可熔炼性" },
  // { version: "", desc: "锦致装饰末影人头颅的匠魂可熔炼性" },
  // { version: "", desc: "夸克金栏杆的匠魂可熔炼性" },
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
  player.tell(
    Text.of("§b当前版本为 §9" + newestVersion + " §b。遇到问题或建议可加QQ群: §e" + QQ_GROUP)
      .clickCopy(QQ_GROUP)
      .hover("§b点击复制群号: §e" + QQ_GROUP)
  );
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
      player.tell(
        Text.of("§b……§e" + moreCount + "§b个更多版本更新日志。使用§a/kiane_history§b查看主版本更新日志，或加入QQ群§e" + QQ_GROUP + "§b获取更多信息。")
          .clickCopy(QQ_GROUP)
          .hover("§b点击复制群号: §e" + QQ_GROUP)
      );
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