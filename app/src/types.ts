export interface CaptainRecord {
  rank?: number;

  uid: number;

  username: string;

  type: string;

  accompany?: number;

  medal_name?: string;

  medal_level?: number;
}

export interface Record {
  date: Date;

  captains: CaptainRecord[];
}

export interface UpInfo {
  mid: number;

  /**
   * 昵称
   */
  name: string;

  /**
   * 头像链接
   */
  face: string;

  /**
   * 签名
   */
  sign: string;

  /**
   * 主页头图链接
   */
  space: string;

  /**
   * 粉丝数
   */
  fans: number;

  /**
   *
   */
  like_num: number;
}
