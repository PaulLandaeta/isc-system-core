import * as MailerService from '../../src/services/mailerService';

jest.mock('../../src/plugin/mailer/mailerPlugin', () => ({
  sendMail: jest.fn(),
}));

const mailerPlugin = require('../../src/plugin/mailer/mailerPlugin');

describe('mailerService.sendMail', () => {
  afterEach(() => jest.clearAllMocks());

  it('calls mailerPlugin.sendMail with given options', async () => {
    const options = { to: 'a@b.com', recipientName: 'a', subject: 's', html: '<p>hi</p>' };
    await MailerService.sendMail(options as any);
    expect(mailerPlugin.sendMail).toHaveBeenCalledWith(options);
  });

  it('propagates errors from mailerPlugin', async () => {
    (mailerPlugin.sendMail as jest.Mock).mockRejectedValue(new Error('fail'));
    await expect(MailerService.sendMail({} as any)).rejects.toThrow('fail');
  });
});

describe('mailerService.sendStudentReviewEmail', () => {
  afterEach(() => jest.clearAllMocks());

  it('builds options and delegates to sendMail', async () => {
    const spy = jest.spyOn(MailerService, 'sendMail').mockResolvedValue();
    await MailerService.sendStudentReviewEmail('e','n','sub','text');
    expect(spy).toHaveBeenCalledWith({
      to: 'e',
      recipientName: 'n',
      subject: 'sub',
      html: 'text',
    });
  });

  it('propagates errors from sendMail', async () => {
    jest.spyOn(MailerService, 'sendMail').mockRejectedValue(new Error('err'));
    await expect(MailerService.sendStudentReviewEmail('e','n','s','t')).rejects.toThrow('err');
  });
});
