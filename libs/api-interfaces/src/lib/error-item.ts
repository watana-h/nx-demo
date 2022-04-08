/**
 * @name エラー情報
 * @description 本システムのエラー情報を管理
*/
export enum ErrorTarget {
  flontend = '1',
  backend = '2',
  other = '0'
}
export interface ErrorItem {
  errorCode?: number,
  errorMessage?: string,
  errorTarget: ErrorTarget
}

/**
 * @name errorTargetTbls
 * @description 日本語表記(ErrorItem - errorTarget)
*/
export const errorTargetTbls = [
  { id: '1', title: 'フロントエンド アプリ障害' },
  { id: '2', title: 'バックエンド アプリ障害' },
  { id: '0', title: 'システム障害' }
];

/**
 * @name errorResponseTbls
 * @description 日本語表記(HttpErrorResponse)
*/
export const errorResponseTbls = [
  { code: 403, title: 'アクセスが拒否されました。' },
  { code: 404, title: '対象ページが存在しません。' },
  { code: 500, title: '内部エラーが発生しました。' },
  { code: 503, title: 'サービスが利用できません。' },
  { code: 504, title: 'サービス利用タイムアウトが発生しました。' }
];




