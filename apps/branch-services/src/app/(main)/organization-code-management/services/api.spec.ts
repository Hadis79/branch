import Api from './api';

describe('organization code mock api', () => {
  it('supports the complete create, search, update and delete flow', async () => {
    const created = await Api.createOrganizationCode({
      nationalId: '۹۸۷۶۵۴۳۲۱۰',
      organizationCode: '987654',
      accountNumber: '1234567890123',
    });

    expect(created).toMatchObject({
      nationalId: '9876543210',
      organizationCode: '987654',
      accountNumber: '1234567890123',
    });

    const searchResult = await Api.getOrganizationCodes({
      filter: { nationalId: '9876543210' },
      pagination: { page: 1, size: 10 },
    });
    expect(searchResult.content).toHaveLength(1);

    const updated = await Api.updateOrganizationCode(created.id, {
      nationalId: created.nationalId,
      organizationCode: '456789',
      accountNumber: '',
    });
    expect(updated).toMatchObject({ organizationCode: '456789', accountNumber: undefined });

    await Api.deleteOrganizationCode(created.id);
    const resultAfterDelete = await Api.getOrganizationCodes({
      filter: { nationalId: created.nationalId },
      pagination: { page: 1, size: 10 },
    });
    expect(resultAfterDelete.content).toHaveLength(0);
  });
});
