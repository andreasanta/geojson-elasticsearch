import { loadAllRamps, loadMaterials, loadSizes } from '../../apis';

export const loadAll = () => {
        loadAllRamps();
        loadMaterials();
        loadSizes();
}