declare module 'sslcommerz-lts' {
    interface SSLCommerzInitParams {
      total_amount: number;
      currency: string;
      tran_id: string;
      success_url: string;
      fail_url: string;
      cancel_url: string;
      shipping_method?: string;
      product_name?: string;
      product_category?: string;
      product_profile?: string;
      cus_name?: string;
      cus_email?: string;
      cus_add1?: string;
      cus_add2?: string;
      cus_city?: string;
      cus_state?: string;
      cus_postcode?: string;
      cus_country?: string;
      cus_phone?: string;
      cus_fax?: string;
      ship_name?: string;
      ship_add1?: string;
      ship_add2?: string;
      ship_city?: string;
      ship_state?: string;
      ship_postcode?: string;
      ship_country?: string;
      multi_card_name?: string;
      value_a?: string;
      value_b?: string;
      value_c?: string;
      value_d?: string;
      [key: string]: any;
    }
  
    interface SSLCommerzResponse {
      status: string;
      failedreason?: string;
      sessionkey?: string;
      GatewayPageURL?: string;
      directPaymentURL?: string;
      emi_info?: any[];
      [key: string]: any;
    }
  
    class SSLCommerzPayment {
      constructor(store_id: string, store_passwd: string, is_live: boolean);
      init(data: SSLCommerzInitParams): Promise<SSLCommerzResponse>;
      validate(data: any): Promise<any>;
      initiateRefund(data: any): Promise<any>;
      refundQuery(data: any): Promise<any>;
      setUrls(urls: {
        success: string;
        fail: string;
        cancel: string;
        ipn?: string;
      }): void;
    }
  
    export = SSLCommerzPayment;
  }