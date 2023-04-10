import { api } from "src/boot/axios";
import { useLoading } from "src/plugins/loading";
import { useNotify } from "src/plugins/notify";
import { useRouter } from "vue-router";
const { showLoading, hideLoading } = useLoading();
const { positive, negative } = useNotify();
const router = useRouter();
const getNumber = (str) => parseFloat(String(str).replace(/\s/g, ""));

const formatNumber = (num, decimals = 2) => {
  const formattedNum = getNumber(num)
    .toFixed(decimals)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
  return formattedNum.endsWith(".00")
    ? formattedNum.slice(0, -3)
    : formattedNum;
};

const makeRequest = async (method, url, data = null, options = {}) => {
  try {
    showLoading();
    const response = await api[method](url, data, options);
    if (response.status === 200 || response.status === 201) {
      if (method !== "get") positive("Муваффақиятли амалга ошди!");
      return { success: true, data: response.data };
    }
  } catch (error) {
    if (
      error.request &&
      error.request.status !== 401 &&
      error.request.status !== 404 &&
      error.request.status !== 500 &&
      error.request.status !== 409
    ) {
      negative("Интернет билан муаммо бор. Қайтадан уриниб кўринг!");
      return { success: false, data: error.request };
    }
    negative(error.response.data.message || "Ҳатолик рўй берди");
    return { success: false, data: error.response };
  } finally {
    hideLoading();
  }
};

export function useUtils() {
  return {
    getNumber,
    formatNumber,
    makeRequest,
  };
}
