/**
 * 뱃지 잠금 해제 여부를 판단하는 규칙 모음
 *
 * 뱃지 데이터와 번역키 파일이 rule 의
 * targetBadgeId 값에 의존되기에 작업 시 확인 필수
 */
import { StorageManager } from 'src/modules/database';
import type { BadgeUnlockRule } from './types';

// 최초 레벨업
const firstLevelUp: BadgeUnlockRule<'levelup'> = {
  description: 'first level up',
  eventType: 'levelup',
  targetBadgeId: 1,
  evaluation(_context, event) {
    return event.level === 2;
  },
};

// 레벨 10 달성
const levelReachedAt10: BadgeUnlockRule<'levelup'> = {
  description: 'level reached at 10',
  eventType: 'levelup',
  targetBadgeId: 2,
  evaluation(_context, event) {
    return event.level === 10;
  },
};

// 레벨 50 달성
const levelReachedAt50: BadgeUnlockRule<'levelup'> = {
  description: 'level reached at 50',
  eventType: 'levelup',
  targetBadgeId: 3,
  evaluation(_context, event) {
    return event.level === 50;
  },
};

// 레벨 100 달성
const levelReachedAt100: BadgeUnlockRule<'levelup'> = {
  description: 'level reached at 100',
  eventType: 'levelup',
  targetBadgeId: 4,
  evaluation(_context, event) {
    return event.level === 100;
  },
};

// 임무 5개 생성
const missionCountReachedAt5: BadgeUnlockRule<'createMission'> = {
  description: 'created mission count reached at 5',
  eventType: 'createMission',
  targetBadgeId: 10,
  async evaluation() {
    const count = await StorageManager.getInstance().getMissionCount();
    return count === 5;
  },
};

// 임무 20개 생성
const missionCountReachedAt20: BadgeUnlockRule<'createMission'> = {
  description: 'created mission count reached at 20',
  eventType: 'createMission',
  targetBadgeId: 11,
  evaluation: async () => {
    const count = await StorageManager.getInstance().getMissionCount();
    return count === 20;
  },
};

// 최초 임무 완료
const firstMissionDone: BadgeUnlockRule<'createAchieve'> = {
  description: 'first done mission',
  eventType: 'createAchieve',
  targetBadgeId: 6,
  evaluation(context) {
    const alreadyExist = Boolean(
      context.user.unlockedBadges[this.targetBadgeId],
    );
    return StorageManager.getInstance()
      .getAchieveCount()
      .then((count) => !alreadyExist && count === 1);
  },
};

// 임무 완료 횟수 10 달성
const missionDoneCountReactedAt10: BadgeUnlockRule<'createAchieve'> = {
  description: 'mission done count reached at 10',
  eventType: 'createAchieve',
  targetBadgeId: 7,
  evaluation(context) {
    const alreadyExist = Boolean(
      context.user.unlockedBadges[this.targetBadgeId],
    );
    return StorageManager.getInstance()
      .getAchieveCount()
      .then((count) => !alreadyExist && count === 10);
  },
};

// 임무 완료 횟수 50 달성
const missionDoneCountReactedAt50: BadgeUnlockRule<'createAchieve'> = {
  description: 'mission done count reached at 50',
  eventType: 'createAchieve',
  targetBadgeId: 8,
  evaluation(context) {
    const alreadyExist = Boolean(
      context.user.unlockedBadges[this.targetBadgeId],
    );
    return StorageManager.getInstance()
      .getAchieveCount()
      .then((count) => !alreadyExist && count === 50);
  },
};

// 임무 완료 횟수 100 달성
const missionDoneCountReactedAt100: BadgeUnlockRule<'createAchieve'> = {
  description: 'mission done count reached at 100',
  eventType: 'createAchieve',
  targetBadgeId: 9,
  evaluation(context) {
    const alreadyExist = Boolean(
      context.user.unlockedBadges[this.targetBadgeId],
    );
    return StorageManager.getInstance()
      .getAchieveCount()
      .then((count) => !alreadyExist && count === 100);
  },
};

// 임무 최초 삭제
const firstDeleteMission: BadgeUnlockRule<'deleteMission'> = {
  description: 'first delete mission',
  eventType: 'deleteMission',
  targetBadgeId: 5,
  evaluation(context) {
    const alreadyExist = Boolean(
      context.user.unlockedBadges[this.targetBadgeId],
    );
    return !alreadyExist;
  },
};

// 프로필 공유
const firstShareProfile: BadgeUnlockRule<'shareProfile'> = {
  description: 'first share profile',
  eventType: 'shareProfile',
  targetBadgeId: 12,
  evaluation(context) {
    const alreadyExist = Boolean(
      context.user.unlockedBadges[this.targetBadgeId],
    );
    return !alreadyExist;
  },
};

// 최초 오픈소스 페이지 진입
const firstEnterOpenSource: BadgeUnlockRule<'enterOpenSource'> = {
  description: 'first enter open source page',
  eventType: 'enterOpenSource',
  targetBadgeId: 13,
  evaluation(context) {
    const alreadyExist = Boolean(
      context.user.unlockedBadges[this.targetBadgeId],
    );
    return !alreadyExist;
  },
};

// 최초 테마 색상 변경
const firstChangeThemeColor: BadgeUnlockRule<'changeTheme'> = {
  description: 'first change theme color',
  eventType: 'changeTheme',
  targetBadgeId: 14,
  evaluation(context) {
    const alreadyExist = Boolean(
      context.user.unlockedBadges[this.targetBadgeId],
    );
    return !alreadyExist;
  },
};

export const badgeRules = [
  firstLevelUp,
  levelReachedAt10,
  levelReachedAt50,
  levelReachedAt100,
  missionCountReachedAt5,
  missionCountReachedAt20,
  firstMissionDone,
  missionDoneCountReactedAt10,
  missionDoneCountReactedAt50,
  missionDoneCountReactedAt100,
  firstDeleteMission,
  firstShareProfile,
  firstEnterOpenSource,
  firstChangeThemeColor,
] as const;
