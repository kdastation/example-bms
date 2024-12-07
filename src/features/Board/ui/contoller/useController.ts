import { type Controller } from '../types'
import { useSelectController, type SelectControllerArgs } from './useSelectController'
import { useTargetController, type TargetControllerArgs } from './useTargetController'

export type StateController = 'idle' | 'add' | 'drag' | 'edit-text'

export const useController = (
  state: 'idle' | 'add' | 'drag' | 'edit-text',
  controllers: {
    select: SelectControllerArgs
    target: TargetControllerArgs
  }
): Controller => {
  const selectController = useSelectController(controllers.select)

  const targetController = useTargetController(controllers.target)

  if (state === 'idle') {
    return selectController
  }

  if (state === 'add') {
    return targetController
  }

  if (state === 'drag') {
    return {
      stageProps: { draggable: true },
    }
  }

  if (state === 'edit-text') {
    return {
      stageProps: {},
    }
  }

  return {
    stageProps: {},
  }
}
