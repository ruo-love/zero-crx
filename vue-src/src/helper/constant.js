export class Action {
  constructor(type, payload) {
    this.type = type;
    this.payload = payload;
  }
}

/**
 * AI搜索
 * */
export const AI_SEARCH = "AI_SEARCH";
/**
 * 开始搜索
 * */
export const START_SEARCH = "START_SEARCH";
/**
 * 搜索结束
 * */
export const AI_CLOSE = "AI_CLOSE";
/**
 * 日志
 * */
export const ZERO_LOG = "ZERO_LOG";
/**
 * AI 输出
 * */
export const AI_OUTPUT = "AI_OUTPUT";
/**
 * AI PROMPT搜索
 * */
export const AI_PROMPT_SEARCH = "AI_PROMPT_SEARCH";
/**
 * 暂停搜索
 */
export const STOP = "STOP";
