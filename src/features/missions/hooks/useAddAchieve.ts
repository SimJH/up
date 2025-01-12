import { useActor } from '@xstate/react';
import { useMutation, type UseMutationResult } from 'react-query';
import { addAchieve, type AddAchieveResult } from 'src/data';
import { ToastController } from 'src/modules/app/controllers/ToastController';
import { Logger } from 'src/modules/logger';
import { globalMachineService } from 'src/stores/machines';
import { queryClient } from 'src/stores/reactQuery';
import { t } from 'src/translations';
import type { Mission, MissionDetail } from '../types';

const TAG = 'useAddAchieve';

type Data = AddAchieveResult;
type Context = Parameters<typeof addAchieve>[0];
interface UseAddAchieveOptions {
  onSuccess?: (data: Data, context: Context) => void;
}

export const useAddAchieve = (
  options: UseAddAchieveOptions,
): UseMutationResult<
  Data,
  Error,
  Context,
  { previousMission?: Mission; previousMissions?: Mission[] }
> => {
  const [_, send] = useActor(globalMachineService);

  return useMutation(addAchieve, {
    onSuccess: (data, context) => {
      const { mission, achieve } = data;
      const { missionId } = context;

      queryClient.setQueryData<number>(
        ['achieve', 'count'],
        (count) => (count ?? 0) + 1,
      );
      queryClient.setQueryData<MissionDetail>(
        ['missions', 'detail', missionId],
        (missionDetail) => ({
          mission,
          achieveList: [achieve, ...(missionDetail?.achieveList ?? [])],
        }),
      );
      queryClient.setQueryData<Mission[]>(
        ['missions', 'list'],
        (previousMissions = []) =>
          previousMissions.map((previousMission) =>
            previousMission.id === mission.id ? mission : previousMission,
          ),
      );
      send({ type: 'REWARD', exp: achieve.exp });

      void queryClient.invalidateQueries(['missions', 'detail', missionId], {
        refetchActive: false,
      });
      void queryClient.invalidateQueries(['missions', 'list'], {
        refetchActive: false,
      });

      options.onSuccess?.(data, context);
    },
    onError: (error) => {
      Logger.error(TAG, error.message);
      ToastController.show(t('message.error.common'));
    },
  });
};
