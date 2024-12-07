import { type Controller } from '../types'
import { useArrowController, type ArrowControllerArgs } from './useArrowController'
import { useSelectController, type SelectControllerArgs } from './useSelectController'
import { useTargetController, type TargetControllerArgs } from './useTargetController'

export type StateController = 'idle' | 'add' | 'drag' | 'edit-text' | 'arrow'

export const useController = (
  state: StateController,
  controllers: {
    select: SelectControllerArgs
    target: TargetControllerArgs
    arrow: ArrowControllerArgs
  }
): Controller => {
  const selectController = useSelectController(controllers.select)

  const targetController = useTargetController(controllers.target)

  const arrowController = useArrowController(controllers.arrow)

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

  if (state === 'arrow') {
    return arrowController
  }

  return {
    stageProps: {},
  }
}
