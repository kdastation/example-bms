import { type Controller } from '../types'
import { useArrowController, type ArrowControllerArgs } from './useArrowController'
import { useMiltyLineController, type MultiLineControllerArgs } from './useMultiLineController'
import { useSelectController, type SelectControllerArgs } from './useSelectController'
import { useTargetController, type TargetControllerArgs } from './useTargetController'

export type StateController = 'idle' | 'add' | 'drag' | 'edit-text' | 'arrow' | 'multi-line'

export const useController = (
  state: StateController,
  controllers: {
    select: SelectControllerArgs
    target: TargetControllerArgs
    arrow: ArrowControllerArgs
    multiLine: MultiLineControllerArgs
  }
): Controller => {
  const selectController = useSelectController(controllers.select)

  const targetController = useTargetController(controllers.target)

  const arrowController = useArrowController(controllers.arrow)

  const multiLineController = useMiltyLineController(controllers.multiLine)

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

  if (state === 'multi-line') {
    return multiLineController
  }

  return {
    stageProps: {},
  }
}
